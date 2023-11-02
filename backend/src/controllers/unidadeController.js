import Unidade from '../models/Unidade.js';

class UnidadeController {
  static getAllEntities = async (req, res) => {
    try {
      const unidades = await Unidade.findAll();
      res.status(200).json(unidades);
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static getEntityById = async (req, res) => {
    try {
      const entity = await Unidade.findByPk(req.params.id);
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
      const { nome, ativo_unidade, sinc } = req.body;

      const createdEntity = await Unidade.create({
        nome,
        ativo_unidade,
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
      const { id } = req.params;
      const { nome, ativo_unidade, sinc } = req.body;

      const [updatedRows] = await Unidade.update(
        {
          nome,
          ativo_unidade,
          sinc
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        res.status(200).send({ message: 'Entity updated successfully' });
      } else {
        res.status(400).send({
          message: `Unidade ${id} not found!`
        });
      }
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteEntity = async (req, res) => {
    try {
      const entity = await Unidade.findByPk(req.params.id);
      if (entity) {
        await entity.destroy();
        return res.status(204).send();
      } else {
        return res.status(400).send({
          message: `Unidade ${req.params.id} not found!`
        });
      }
    } catch (error) {
      return res.status(500).send({ message: `${error}` });
    }
  };
}

export default UnidadeController;
