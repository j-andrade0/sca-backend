import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';
import Efetivo from './Efetivo.js';

const CartaoVacina = db.define(
	'CartaoVacina',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		efetivoId: {
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

CartaoVacina.belongsTo(Efetivo, {
	foreignKey: 'efetivoId',
	as: 'efetivo'
});

export default CartaoVacina;
