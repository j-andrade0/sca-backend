import Entity from '../models/Graduacao.js';
import { buildPagination, paginationParams } from '../util/pagination.js';

class GraduacaoController {
	static getAllEntities = async (req, res) => {
		const { page, limit, offset } = paginationParams(req.query);

		try {
			const countEntity = await Entity.count();
			const entities = await Entity.findAll({
				order: [['id', 'ASC']],
				offset,
				limit
			});

			const pagination = buildPagination({ path: '/graduacao', page, limit, total: countEntity });
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
					message: `Id ${req.params.id} não encontrado!`
				});
			}
		} catch (error) {
			return res.status(500).send({ message: `${error.message}` });
		}
	};

	static createEntity = async (req, res) => {
		try {
			const { sigla, descricao, ordem } = req.body;

			const createdEntity = await Entity.create({
				sigla,
				descricao,
				ordem
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

	static updateEntity = async (req, res) => {
		try {
			const { sigla, descricao, ordem } = req.body;
			const entityId = req.params.id;

			const [updatedRows] = await Entity.update(
				{
					sigla,
					descricao,
					ordem
				},
				{ where: { id: entityId } }
			);

			if (updatedRows > 0) {
				res.status(200).send({ message: 'Entidade atualizada com sucesso!' });
			} else {
				res.status(400).send({
					message: `Id ${entityId} não encontrado!`
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
					message: `Id ${req.params.id} não encontrado!`
				});
			}
		} catch (error) {
			return res.status(500).send({ message: `${error.message}` });
		}
	};
}

export default GraduacaoController;
