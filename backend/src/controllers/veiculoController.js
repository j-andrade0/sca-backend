import Veiculo from '../models/Veiculo.js';

class VeiculoController {
  static getAllEntities = async (req, res) => {
    try {
      const veiculos = await Veiculo.findAll();
      res.status(200).json(veiculos);
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static getEntityById = async (req, res) => {
    try {
      const entity = await Veiculo.findByPk(req.params.id);
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
        id_efetivo,
        id_visitante,
        tipo,
        cor_veiculo,
        placa,
        modelo,
        renavam,
        qrcode,
        ativo_veiculo,
        sinc_veiculo
      } = req.body;

      const createdEntity = await Veiculo.create({
        id_efetivo,
        id_visitante,
        tipo,
        cor_veiculo,
        placa,
        modelo,
        renavam,
        qrcode,
        ativo_veiculo,
        sinc_veiculo
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
        id_efetivo,
        id_visitante,
        tipo,
        cor_veiculo,
        placa,
        modelo,
        renavam,
        qrcode,
        ativo_veiculo,
        sinc_veiculo
      } = req.body;

      const [updatedRows] = await Veiculo.update(
        {
          id_efetivo,
          id_visitante,
          tipo,
          cor_veiculo,
          placa,
          modelo,
          renavam,
          qrcode,
          ativo_veiculo,
          sinc_veiculo
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        res.status(200).send({ message: 'Entity updated successfully' });
      } else {
        res.status(400).send({
          message: `Veiculo ${id} not found!`
        });
      }
    } catch (error) {
      res.status(500).send({ message: `${error.message}` });
    }
  };

  static deleteEntity = async (req, res) => {
    try {
      const entity = await Veiculo.findByPk(req.params.id);
      if (entity) {
        await entity.destroy();
        return res.status(204).send();
      } else {
        return res.status(400).send({
          message: `Veiculo ${req.params.id} not found!`
        });
      }
    } catch (error) {
      return res.status(500).send({ message: `${error}` });
    }
  };
}

export default VeiculoController;
