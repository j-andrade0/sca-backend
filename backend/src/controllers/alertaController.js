import Alerta from '../models/Alerta.js';

class AlertaController {
  static getAllEntities = async (req, res) => {
    try {
      const alertas = await Alerta.findAll();
      res.status(200).json(alertas);
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static getEntityById = async (req, res) => {
    try {
      const entity = await Alerta.findByPk(req.params.id);
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
      const { nome_alerta, cor, ativo_alerta, sinc } = req.body;

      const createdEntity = await Alerta.create({
        nome_alerta,
        cor,
        ativo_alerta,
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

  static updateEntity = async (req, res) => {
    try {
      const { nome_alerta, cor, ativo_alerta, sinc } = req.body;
      const entityId = req.params.id;

      const [updatedRows] = await Alerta.update(
        {
          nome_alerta,
          cor,
          ativo_alerta,
          sinc
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
      const entity = await Alerta.findByPk(req.params.id);
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

export default AlertaController;
