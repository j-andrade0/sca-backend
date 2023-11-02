import Entity from '../models/Visitante.js';
import verifyPassword from '../util/verifyPassword.js';
import NoEntityError from '../util/customErrors/NoEntityError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class VisitanteController {
	static getAllEntities = async (req, res) => {
		try {
			const visitantes = await Entity.findAll();
			res.status(200).json(visitantes);
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
			const {
				email,
				senha,
				tipo_doc,
				num_doc,
				nome,
				rua,
				numero,
				bairro,
				estado,
				telefone,
				foto,
				empresa,
				autorizador,
				qr_code,
				ativo_visitante,
				sinc
			} = req.body;

			const senhaHashed = await bcrypt.hash(senha, 10);

			const createdEntity = await Entity.create({
				email,
				senha: senhaHashed,
				tipo_doc,
				num_doc,
				nome,
				rua,
				numero,
				bairro,
				estado,
				telefone,
				foto,
				empresa,
				autorizador,
				qr_code,
				ativo_visitante,
				sinc
			});
			res.status(201).json(createdEntity);
		} catch (error) {
			if (error.name == 'SequelizeUniqueConstraintError') {
				res.status(400).send({ message: 'Valores já cadastrados!' });
			} else {
				res.status(500).send({ message: `${error.message}` });
			}
		}
	};

	static login = async (req, res) => {
		const { email, senha } = req.body;
		try {
            const entity = await Entity.findOne({ where: { email } });

			const isPasswordValid = await verifyPassword(entity, senha);

			if (!isPasswordValid) {
				return res.status(401).json({ unauthorized: 'Credenciais inválidas' });
			}

			const jwtToken = jwt.sign({ id: entity.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
			return res.status(200).json({ jwtToken });
		} catch (error) {
			if (error instanceof NoEntityError) {
				return res.status(400).send({ mensagem: 'Entidade não encontrada!' });
			}
			res.status(500).json({ error: error.message });
		}
	};

	static updateEntity = async (req, res) => {
		try {
			const { id } = req.params;
			const {
                email,
                senha,
				tipo_doc,
				num_doc,
				nome,
				rua,
				numero,
				bairro,
				estado,
				telefone,
				foto,
				empresa,
				autorizador,
				qr_code,
				ativo_visitante,
				sinc
			} = req.body;

			const senhaHashed = await bcrypt.hash(senha, 10);

			const [updatedRows] = await Entity.update(
				{
                    email,
                    senha: senhaHashed,
					tipo_doc,
					num_doc,
					nome,
					rua,
					numero,
					bairro,
					estado,
					telefone,
					foto,
					empresa,
					autorizador,
					qr_code,
					ativo_visitante,
					sinc
				},
				{ where: { id } }
			);

			if (updatedRows > 0) {
				res.status(200).send({ message: 'Entity updated successfully' });
			} else {
				res.status(400).send({
					message: `Entity ${id} not found!`
				});
			}
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
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
					message: `Entity ${req.params.id} not found!`
				});
			}
		} catch (error) {
			return res.status(500).send({ message: `${error}` });
		}
	};
}

export default VisitanteController;
