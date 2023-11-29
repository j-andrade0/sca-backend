import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';
import Usuario from './Usuario.js';

const CartaoVacina = db.define(
	'CartaoVacina',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
        },
        usuarioId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		doenca: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		vacina: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		dose: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		data_aplicacao: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
        data_validade: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	},
	{
		tableName: 'cartao_vacina'
	}
);

CartaoVacina.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});


export default CartaoVacina;
