import Efetivo from '../models/Efetivo.js';

class EfetivoController {
  static getAllEntities = async (req, res) => {
    try {
      const efetivos = await Efetivo.findAll();
      res.status(200).json(efetivos);
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static getEntityById = async (req, res) => {
    try {
      const entity = await Efetivo.findByPk(req.params.id);
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
      const {
        id_graduacao,
        nome_completo,
        nome_guerra,
        foto,
        dependente,
        id_alerta,
        id_unidade,
        qrcode_efetivo,
        email,
        ativo_efetivo,
        sinc_efetivo
      } = req.body;

      const createdEntity = await Efetivo.create({
        id_graduacao,
        nome_completo,
        nome_guerra,
        foto,
        dependente,
        id_alerta,
        id_unidade,
        qrcode_efetivo,
        email,
        ativo_efetivo,
        sinc_efetivo
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
      const {
        id_graduacao,
        nome_completo,
        nome_guerra,
        foto,
        dependente,
        id_alerta,
        id_unidade,
        qrcode_efetivo,
        email,
        ativo_efetivo,
        sinc_efetivo
      } = req.body;
      const entityId = req.params.id;

      const [updatedRows] = await Efetivo.update(
        {
          id_graduacao,
          nome_completo,
          nome_guerra,
          foto,
          dependente,
          id_alerta,
          id_unidade,
          qrcode_efetivo,
          email,
          ativo_efetivo,
          sinc_efetivo
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
      const entity = await Efetivo.findByPk(req.params.id);
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

export default EfetivoController;
