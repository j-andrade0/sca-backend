import Visitante from '../models/Visitante.js';

class VisitanteController {
  static getAllEntities = async (req, res) => {
    try {
      const visitantes = await Visitante.findAll();
      res.status(200).json(visitantes);
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static getEntityById = async (req, res) => {
    try {
      const entity = await Visitante.findByPk(req.params.id);
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
        tipo_doc,
        num_doc,
        nome,
        rua,
        numero,
        bairro,
        estado,
        telefone,
        foto,
        empresa,
        autorizador,
        qr_code,
        ativo_visitante,
        sinc
      } = req.body;

      const createdEntity = await Visitante.create({
        tipo_doc,
        num_doc,
        nome,
        rua,
        numero,
        bairro,
        estado,
        telefone,
        foto,
        empresa,
        autorizador,
        qr_code,
        ativo_visitante,
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
      const {
        tipo_doc,
        num_doc,
        nome,
        rua,
        numero,
        bairro,
        estado,
        telefone,
        foto,
        empresa,
        autorizador,
        qr_code,
        ativo_visitante,
        sinc
      } = req.body;

      const [updatedRows] = await Visitante.update(
        {
          tipo_doc,
          num_doc,
          nome,
          rua,
          numero,
          bairro,
          estado,
          telefone,
          foto,
          empresa,
          autorizador,
          qr_code,
          ativo_visitante,
          sinc
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        res.status(200).send({ message: 'Entity updated successfully' });
      } else {
        res.status(400).send({
          message: `Visitante ${id} not found!`
        });
      }
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteEntity = async (req, res) => {
    try {
      const entity = await Visitante.findByPk(req.params.id);
      if (entity) {
        await entity.destroy();
        return res.status(204).send();
      } else {
        return res.status(400).send({
          message: `Visitante ${req.params.id} not found!`
        });
      }
    } catch (error) {
      return res.status(500).send({ message: `${error}` });
    }
  };
}

export default VisitanteController;
