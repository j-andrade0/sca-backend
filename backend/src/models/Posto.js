import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Posto = db.define(
	'Posto',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		nome: {
			type: DataTypes.STRING(60),
			allowNull: false
		},
		nivel_acesso: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ativo_posto: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		sinc_posto: {
			type: DataTypes.BIGINT,
			allowNull: true
		}
	},
	{
		tableName: 'posto'
	}
);

export default Posto;
