import CartaoVacina from '../models/CartaoVacina.js';
import Efetivo from '../models/Efetivo.js';
import { buildPagination, paginationParams } from '../util/pagination.js';

class CartaoVacinaController {
	static getAllEntities = async (req, res) => {
		const { page, limit, offset } = paginationParams(req.query);

		try {
			const countEntity = await CartaoVacina.count();
			const entities = await CartaoVacina.findAll({
				order: [['id', 'ASC']],
				offset,
				limit,
				include: [
					{
						model: Efetivo,
						as: 'efetivo'
					}
				]
			});

			const pagination = buildPagination({ path: '/cartoesvacina', page, limit, total: countEntity });
			res.status(200).json({ entities, pagination });
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static getEntityById = async (req, res) => {
		try {
			const entity = await CartaoVacina.findByPk(req.params.id, {
				include: [
					{
						model: Efetivo,
						as: 'efetivo'
					}
				]
			});
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
			const { efetivoId, doenca, vacina, dose, data_aplicacao, data_validade } = req.body;

			const createdEntity = await CartaoVacina.create({
				efetivoId,
				doenca,
				vacina,
				dose,
				data_aplicacao,
				data_validade
			});
			return res.status(201).json(createdEntity);
		} catch (error) {
			return res.status(500).send({ message: `${error.message}` });
		}
	};

	static updateEntity = async (req, res) => {
		try {
			const { efetivoId, doenca, vacina, dose, data_aplicacao, data_validade } = req.body;
			const entityId = req.params.id;

			const [updatedRows] = await CartaoVacina.update(
				{
					efetivoId,
					doenca,
					vacina,
					dose,
					data_aplicacao,
					data_validade
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
			const entity = await CartaoVacina.findByPk(req.params.id);
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

export default CartaoVacinaController;
