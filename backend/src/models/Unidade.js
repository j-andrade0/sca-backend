import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Unidade = db.define(
	'Unidade',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		nome: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		ativo_unidade: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		sinc: {
			type: DataTypes.BIGINT,
			allowNull: false
		}
	},
	{
		tableName: 'unidade'
	}
);

export default Unidade;
