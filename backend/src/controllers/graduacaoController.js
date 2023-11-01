import Graduacao from '../models/Graduacao.js';

class GraduacaoController {
  static getAllEntities = async (req, res) => {
    try {
      const graduacoes = await Graduacao.findAll();
      res.status(200).json(graduacoes);
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static getEntityById = async (req, res) => {
    try {
      const entity = await Graduacao.findByPk(req.params.id);
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
      const { sigla, descricao, ordem } = req.body;

      const createdEntity = await Graduacao.create({
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

      const [updatedRows] = await Graduacao.update(
        {
          sigla,
          descricao,
          ordem
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
      const entity = await Graduacao.findByPk(req.params.id);
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

export default GraduacaoController;
