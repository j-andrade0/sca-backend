import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Alerta = db.define(
	'Alerta',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		nome_alerta: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		cor: {
			type: DataTypes.STRING(15),
			allowNull: false
		},
		data: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false
		},
		ativo_alerta: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		sinc: {
			type: DataTypes.BIGINT,
			allowNull: true
		}
	},
	{
		tableName: 'alerta'
	}
);

export default Alerta;
