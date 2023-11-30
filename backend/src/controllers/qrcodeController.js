import Entity from '../models/QRCode.js';
import Visitante from '../models/Visitante.js';
import Depentende from '../models/Dependente.js';
import Veiculo from '../models/Veiculo.js';
import Efetivo from '../models/Efetivo.js';

class QRCodeController {
	static getAllEntities = async (req, res) => {
		const { page = 1 } = req.query;
		const limit = 10;
		let lastPage = 1;
		const countEntity = await Entity.count();

		try {
			const entities = await Entity.findAll({
				order: [['qrcode', 'ASC']],
				offset: Number(page * limit - limit),
				limit: limit
			});

			const pagination = {
				path: '/qrcode',
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

	static getEntityByQRCode = async (req, res) => {
		const { qrcode } = req.params;
		try {
			const entity = await Entity.findByPk(qrcode);
			if (entity) {
				const fullEntity = await this._getEntity(entity);
				return res.status(200).json(fullEntity);
			} else {
				return res.status(400).send({
					message: `QRCode ${qrcode} not found!`
				});
			}
		} catch (error) {
			return res.status(500).send({ message: `${error.message}` });
		}
	};

	static createEntity = async (req, res) => {
		try {
			const { nivel_acesso, entity } = req.body;

			const createdEntity = await Entity.create({
				nivel_acesso,
				entity
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
		const { qrcode } = req.params;
		try {
			const { nivel_acesso, entity } = req.body;

			const [updatedRows] = await Entity.update(
				{
					nivel_acesso,
					entity
				},
				{ where: { qrcode } }
			);

			if (updatedRows > 0) {
				res.status(200).send({ message: 'Entity updated successfully' });
			} else {
				res.status(400).send({
					message: `QRCode ${qrcode} not found!`
				});
			}
		} catch (error) {
			res.status(500).send({ message: `${error.message}` });
		}
	};

	static deleteEntity = async (req, res) => {
		const { qrcode } = req.params;
		try {
			const entity = await Entity.findByPk(qrcode);
			if (entity) {
				await entity.destroy();
				return res.status(204).send();
			} else {
				return res.status(400).send({
					message: `QRCode ${qrcode} not found!`
				});
			}
		} catch (error) {
			return res.status(500).send({ message: `${error.message}` });
		}
	};

	static _getEntity = async (qrcode) => {
		if (qrcode.entity === 'efetivo') {
			const efetivo = await Efetivo.findOne({ where: { qrcode_efetivo: qrcode.qrcode } });
			qrcode.dataValues.efetivo = efetivo.dataValues;

			return qrcode;
		} else if (qrcode.entity === 'visitante') {
			const visitante = await Visitante.findOne({ where: { qrcode_visitante: qrcode.qrcode } });
			qrcode.dataValues.visitante = visitante.dataValues;

			return qrcode;
		} else if (qrcode.entity === 'dependente') {
			const dependente = await Depentende.findOne({ where: { qrcode: qrcode.qrcode } });
			qrcode.dataValues.dependente = dependente.dataValues;

			return qrcode;
		} else if (qrcode.entity === 'veiculo') {
			const veiculo = await Veiculo.findOne({ where: { qrcode: qrcode.qrcode } });
			qrcode.dataValues.veiculo = veiculo.dataValues;

			return qrcode;
		}
	};
}

export default QRCodeController;
