import RegistroAcesso from '../models/Registro_Acesso.js';

class RegistroAcessoController {
  static getAllEntities = async (req, res) => {
    try {
      const registrosAcesso = await RegistroAcesso.findAll();
      res.status(200).json(registrosAcesso);
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static getEntityById = async (req, res) => {
    try {
      const entity = await RegistroAcesso.findByPk(req.params.id);
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
        tipo,
        data,
        hora,
        id_posto,
        qrcode,
        id_visitante,
        id_dependente,
        id_veiculo,
        autorizador,
        sinc_acesso
      } = req.body;

      const createdEntity = await RegistroAcesso.create({
        tipo,
        data,
        hora,
        id_posto,
        qrcode,
        id_visitante,
        id_dependente,
        id_veiculo,
        autorizador,
        sinc_acesso
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
        tipo,
        data,
        hora,
        id_posto,
        qrcode,
        id_visitante,
        id_dependente,
        id_veiculo,
        autorizador,
        sinc_acesso
      } = req.body;

      const [updatedRows] = await RegistroAcesso.update(
        {
          tipo,
          data,
          hora,
          id_posto,
          qrcode,
          id_visitante,
          id_dependente,
          id_veiculo,
          autorizador,
          sinc_acesso
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        res.status(200).send({ message: 'Entity updated successfully' });
      } else {
        res.status(400).send({
          message: `Registro de Acesso ${id} not found!`
        });
      }
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteEntity = async (req, res) => {
    try {
      const entity = await RegistroAcesso.findByPk(req.params.id);
      if (entity) {
        await entity.destroy();
        return res.status(204).send();
      } else {
        return res.status(400).send({
          message: `Registro de Acesso ${req.params.id} not found!`
        });
      }
    } catch (error) {
      return res.status(500).send({ message: `${error}` });
    }
  };
}

export default RegistroAcessoController;