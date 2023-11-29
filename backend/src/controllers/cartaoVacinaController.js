import CartaoVacina from '../models/CartaoVacina.js';
import Usuario from '../models/Usuario.js';

class CartaoVacinaController {
  static getAllEntities = async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    let lastPage = 1;
    const countEntity = await CartaoVacina.count();

    try {
      const entities = await CartaoVacina.findAll({
        order: [['id', 'ASC']],
        offset: Number(page * limit - limit),
        limit: limit,
        include: [
          {
            model: Usuario,
            as: 'usuario',
          },
        ],
      });

      const pagination = {
        path: '/cartoesvacina',
        page,
        prev_page: page - 1 >= 1 ? page - 1 : false,
        next_page:
          Number(page) + Number(1) > lastPage
            ? false
            : Number(page) + Number(1),
        lastPage,
        totalRegisters: countEntity,
      };
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
            model: Usuario,
            as: 'usuario',
          },
        ],
      });
      if (entity) {
        return res.status(200).json(entity);
      } else {
        return res.status(400).send({
          message: `Id ${req.params.id} not found!`,
        });
      }
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static createEntity = async (req, res) => {
    try {
      const {
        usuarioId,
        doenca,
        vacina,
        dose,
        data_aplicacao,
        data_validade,
      } = req.body;

      const createdEntity = await CartaoVacina.create({
        usuarioId,
        doenca,
        vacina,
        dose,
        data_aplicacao,
        data_validade,
      });
      return res.status(201).json(createdEntity);
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };

  static updateEntity = async (req, res) => {
    try {
      const {
        usuarioId,
        doenca,
        vacina,
        dose,
        data_aplicacao,
        data_validade,
      } = req.body;
      const entityId = req.params.id;

      const [updatedRows] = await CartaoVacina.update(
        {
          usuarioId,
          doenca,
          vacina,
          dose,
          data_aplicacao,
          data_validade,
        },
        { where: { id: entityId } }
      );

      if (updatedRows > 0) {
        res.status(200).send({ message: 'Entity updated successfully' });
      } else {
        res.status(400).send({
          message: `Id ${entityId} not found!`,
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
          message: `Id ${req.params.id} not found!`,
        });
      }
    } catch (error) {
      return res.status(500).send({ message: `${error.message}` });
    }
  };
}

export default CartaoVacinaController;
