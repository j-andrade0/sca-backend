import Entity from '../models/Dependente.js';
import QRCode from '../models/QRCode.js';
import { buildPagination, paginationParams } from '../util/pagination.js';

class DependenteController {
	static getAllEntities = async (req, res) => {
		const { page, limit, offset } = paginationParams(req.query);

		try {
			const countEntity = await Entity.count();
			const entities = await Entity.findAll({
				order: [['id', 'ASC']],
				offset,
				limit
			});

			const pagination = buildPagination({ path: '/dependentes', page, limit, total: countEntity });
			res.status(200).json({ entities, pagination });
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
			return res.status(500).send({ message: `${error.message}` });
		}
	};

	static createEntity = async (req, res) => {
		try {
			const { id_efetivo, nome, parentesco, nivel_acesso, ativo_dependente, sinc_dependente } = req.body;

			var createdQRCode = await QRCode.create({
				nivel_acesso,
				entity: 'dependente'
			});

			const createdEntity = await Entity.create({
				id_efetivo,
				nome,
				parentesco,
				qrcode: createdQRCode.qrcode,
				ativo_dependente,
				sinc_dependente
			});
			return res.status(201).json(createdEntity);
		} catch (error) {
			if (error.name == 'SequelizeUniqueConstraintError') {
				if (createdQRCode) createdQRCode.destroy();
				return res.status(400).send({ message: 'Valores já cadastrados!' });
			} else {
				if (createdQRCode) createdQRCode.destroy();
				return res.status(500).send({ message: `${error.message}` });
			}
		}
	};

	static updateEntity = async (req, res) => {
		try {
			const { id_efetivo, nome, parentesco, qrcode, ativo_dependente, sinc_dependente } = req.body;
			const entityId = req.params.id;

			const [updatedRows] = await Entity.update(
				{
					id_efetivo,
					nome,
					parentesco,
					qrcode,
					ativo_dependente,
					sinc_dependente
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

export default DependenteController;
