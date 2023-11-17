import Entity from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyPassword from '../util/verifyPassword.js';
import NoEntityError from '../util/customErrors/NoEntityError.js';

class UserController {
	static getAllEntities = async (req, res) => {
		const { page = 1 } = req.query;
		const limit = 10;
		let lastPage = 1;
		const countEntity = await Entity.count();

		try {
			const entities = await Entity.findAll({
				order: [['id', 'ASC']],
				offset: Number(page * limit - limit),
				limit: limit
			});

			entities.forEach((entity) => {
				delete entity.dataValues.senha;
			});

			const pagination = {
				path: '/usuario',
				page,
				prev_page: page - 1 >= 1 ? page - 1 : false,
				next_page: Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
				lastPage,
				totalRegisters: countEntity
			};
			res.status(200).json({ entities, pagination });
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static getEntityById = async (req, res) => {
		try {
			const entity = await Entity.findByPk(req.params.id);

			if (entity) {
				delete entity.dataValues.senha;
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

			delete createdEntity.dataValues.senha;

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

	static updateEntity = async (req, res) => {
		try {
			const { usuario, senha, nivel_acesso, flag } = req.body;
			const senhaHashed = await bcrypt.hash(senha, 10);

			const entityId = req.params.id;

			const [updatedRows] = await Entity.update(
				{
					usuario,
					senhaHashed,
					nivel_acesso,
					flag
				},
				{ where: { id: entityId } }
			);

			if (updatedRows > 0) {
				res.status(200).send({ message: 'Entity updated successfully' });
			} else {
				res.status(400).send({
					message: `Id ${entityId} not found!`
				});
			}
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static login = async (req, res) => {
		const { usuario, senha } = req.body;
		try {
			const entity = await Entity.findOne({ where: { usuario } });

			const isPasswordValid = await verifyPassword(entity, senha);

			if (!isPasswordValid) {
				return res.status(401).json({ unauthorized: 'Credenciais inválidas' });
			}

			const jwtToken = jwt.sign({ id: entity.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

			delete entity.dataValues.senha;

			return res.status(200).send({ jwtToken, entity });
		} catch (error) {
			if (error instanceof NoEntityError) {
				return res.status(400).send({ mensagem: 'Usuario não encontrado!' });
			}
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
