import Sincronismo from '../models/Sincronismo.js';

class SincronismoController {
  static getAllEntities = async (req, res) => {
    try {
      const sincronismos = await Sincronismo.findAll();
      res.status(200).json(sincronismos);
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static getEntityById = async (req, res) => {
    try {
      const entity = await Sincronismo.findByPk(req.params.id);
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
        sinc_pessoa_geral,
        sinc_posto_geral,
        sinc_dependente_geral,
        sinc_veiculo_geral
      } = req.body;

      const createdEntity = await Sincronismo.create({
        sinc_pessoa_geral,
        sinc_posto_geral,
        sinc_dependente_geral,
        sinc_veiculo_geral
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
      const { id } = req.params;
      const {
        sinc_pessoa_geral,
        sinc_posto_geral,
        sinc_dependente_geral,
        sinc_veiculo_geral
      } = req.body;

      const [updatedRows] = await Sincronismo.update(
        {
          sinc_pessoa_geral,
          sinc_posto_geral,
          sinc_dependente_geral,
          sinc_veiculo_geral
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        res.status(200).send({ message: 'Entity updated successfully' });
      } else {
        res.status(400).send({
          message: `Sincronismo ${id} not found!`
        });
      }
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteEntity = async (req, res) => {
    try {
      const entity = await Sincronismo.findByPk(req.params.id);
      if (entity) {
        await entity.destroy();
        return res.status(204).send();
      } else {
        return res.status(400).send({
          message: `Sincronismo ${req.params.id} not found!`
        });
      }
    } catch (error) {
      return res.status(500).send({ message: `${error}` });
    }
  };
}

export default SincronismoController;