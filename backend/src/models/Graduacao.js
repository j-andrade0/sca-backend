import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Graduacao = db.define(
	'Graduacao',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		sigla: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		descricao: {
			type: DataTypes.STRING(15),
			allowNull: false
		},
		ordem: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		tableName: 'graduacao'
	}
);

export default Graduacao;
