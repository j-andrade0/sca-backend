import Entity from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
	static getAllEntities = async (req, res) => {
		try {
			const users = await Entity.findAll();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static getEntityById = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (entity) {
				return res.status(200).json(entity);
			} else {
				return res.status(400).send({
					message: `Id ${req.params.id} not found!`
				});
			}
		} catch (error) {
			return res.status(500).send({ message: `${error}` });
		}
	};

	static createEntity = async (req, res) => {
		try {
			const { usuario, senha, nivel_acesso, flag } = req.body;
			const senhaHashed = await bcrypt.hash(senha, 10);

			const createdEntity = await Entity.create({
				usuario,
				senha: senhaHashed,
				nivel_acesso,
				flag
			});
			res.status(201).send({
				usuario: createdEntity
			});
		} catch (error) {
			if (error.name == 'SequelizeUniqueConstraintError') {
				res.status(400).send({ message: 'Valores já cadastrados!' });
			} else {
				res.status(500).send({ message: `${error.message}` });
			}
		}
	};

	static login = async (req, res) => {
		const { usuario, senha } = req.body;
		try {
			const entity = await Entity.findOne({ where: { usuario } });
			if (!entity) {
				return res.status(400).send({ mensagem: 'Usuario não encontrado!' });
			}

			const isPasswordValid = await bcrypt.compare(senha, entity.senha);

			if (!isPasswordValid) {
				return res.status(401).json({ unauthorized: 'Credenciais inválidas' });
			}

			const jwtToken = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
			return res.status(200).json({ jwtToken });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};

	static deleteEntity = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);
			if (entity) {
				await entity.destroy();
				return res.status(204).send();
			} else {
				return res.status(400).send({
					message: `Id ${req.params.id} not found!`
				});
			}
		} catch (error) {
			return res.status(500).send({ message: `${error}` });
		}
	};
}

export default UserController;
