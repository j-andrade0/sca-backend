import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Usuario = db.define(
	'Usuario',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		usuario: {
			type: DataTypes.INTEGER,
			allowNull: true,
			unique: true
		},
		senha: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		nivel_acesso: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		flag: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
	{
		tableName: 'usuario'
	}
);

export default Usuario;
