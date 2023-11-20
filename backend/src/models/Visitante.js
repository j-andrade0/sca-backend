import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Visitante = db.define(
	'Visitante',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		senha: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		tipo_doc: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		num_doc: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		nome: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		rua: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		numero: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		bairro: {
			type: DataTypes.STRING(40),
			allowNull: false
		},
		estado: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		telefone: {
			type: DataTypes.STRING(11),
			allowNull: true
		},
		foto: {
			type: DataTypes.BLOB,
			allowNull: true
		},
		empresa: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		autorizador: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		qrcode_visitante: {
			type: DataTypes.INTEGER,
			references: {
				model: 'qrcode',
				key: 'qrcode'
			},
			allowNull: false
		},
		ativo_visitante: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		permissionDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		sinc: {
			type: DataTypes.BIGINT,
			allowNull: true
		}
	},
	{
		tableName: 'visitante'
	}
);

export default Visitante;
