import Entity from '../models/QRCode.js';

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
			const entity = await QRCode.findByPk(qrcode);
			if (entity) {
				return res.status(200).json(entity);
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
			const { nivel_acesso } = req.body;

			const createdEntity = await QRCode.create({
				nivel_acesso
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
			const { nivel_acesso } = req.body;

			const [updatedRows] = await QRCode.update(
				{
					nivel_acesso
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
			const entity = await QRCode.findByPk(qrcode);
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
}

export default QRCodeController;
