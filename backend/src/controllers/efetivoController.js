import Entity from '../models/Efetivo.js';
import verifyPassword from '../util/verifyPassword.js';
import bcrypt from 'bcrypt';
import NoEntityError from '../util/customErrors/NoEntityError.js';
import jwt from 'jsonwebtoken';

class EfetivoController {
	static getAllEntities = async (req, res) => {
		try {
			const efetivos = await Entity.findAll();

			efetivos.forEach((efetivo) => {
				delete efetivo.dataValues.senha;
			});

			res.status(200).json(efetivos);
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
			return res.status(500).send({ message: `${error.message}` });
		}
	};

	static createEntity = async (req, res) => {
		try {
			const {
				id_graduacao,
				nome_completo,
				nome_guerra,
				foto,
				dependente,
				id_alerta,
				id_unidade,
				qrcode_efetivo,
				email,
				senha,
				ativo_efetivo,
				sinc_efetivo
			} = req.body;

			const senhaHashed = await bcrypt.hash(senha, 10);

			const createdEntity = await Entity.create({
				id_graduacao,
				nome_completo,
				nome_guerra,
				foto,
				dependente,
				id_alerta,
				id_unidade,
				qrcode_efetivo,
				email,
				senha: senhaHashed,
				ativo_efetivo,
				sinc_efetivo
			});

			delete createdEntity.dataValues.senha;

			res.status(201).json(createdEntity);
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
			const {
				id_graduacao,
				nome_completo,
				nome_guerra,
				foto,
				dependente,
				id_alerta,
				id_unidade,
				qrcode_efetivo,
				email,
				ativo_efetivo,
				sinc_efetivo
			} = req.body;
			const entityId = req.params.id;

			const [updatedRows] = await Entity.update(
				{
					id_graduacao,
					nome_completo,
					nome_guerra,
					foto,
					dependente,
					id_alerta,
					id_unidade,
					qrcode_efetivo,
					email,
					ativo_efetivo,
					sinc_efetivo
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
		const { email, senha } = req.body;
		try {
			const entity = await Entity.findOne({ where: { email } });

			const isPasswordValid = await verifyPassword(entity, senha);

			if (!isPasswordValid) {
				return res.status(401).json({ unauthorized: 'Credenciais inválidas' });
			}

			const jwtToken = jwt.sign({ id: entity.id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
			delete entity.dataValues.senha;

			return res.status(200).send({ jwtToken, entity });
		} catch (error) {
			if (error instanceof NoEntityError) {
				return res.status(400).send({ mensagem: 'Entidade não encontrada!' });
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
			return res.status(500).send({ message: `${error.message}` });
		}
	};
}

export default EfetivoController;
