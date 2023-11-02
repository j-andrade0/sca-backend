import Dependente from '../models/Dependente.js';

class DependenteController {
  static getAllEntities = async (req, res) => {
    try {
      const dependentes = await Dependente.findAll();
      res.status(200).json(dependentes);
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static getEntityById = async (req, res) => {
    try {
      const entity = await Dependente.findByPk(req.params.id);
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
      const { id_efetivo, nome, parentesco, qrcode, ativo_dependente, sinc_dependente } = req.body;

      const createdEntity = await Dependente.create({
        id_efetivo,
        nome,
        parentesco,
        qrcode,
        ativo_dependente,
        sinc_dependente
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
      const { id_efetivo, nome, parentesco, qrcode, ativo_dependente, sinc_dependente } = req.body;
      const entityId = req.params.id;

      const [updatedRows] = await Dependente.update(
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
      const entity = await Dependente.findByPk(req.params.id);
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
