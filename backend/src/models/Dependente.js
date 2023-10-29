import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Depentende = db.define(
	'Depentende',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		id_efetivo: {
			type: DataTypes.INTEGER,
			references: {
				model: 'efetivo',
				key: 'id'
			},
			allowNull: false
		},
		nome: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		parentesco: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		qrcode: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		ativo_dependente: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		sinc_dependente: {
			type: DataTypes.BIGINT,
			allowNull: true
		}
	},
	{
		tableName: 'dependente'
	}
);

export default Depentende;
