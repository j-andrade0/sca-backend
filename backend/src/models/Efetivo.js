import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Efetivo = db.define(
	'Efetivo',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		id_graduacao: {
			type: DataTypes.INTEGER,
			references: {
				model: {
					tableName: 'graduacao'
				},
				key: 'id'
			},
			allowNull: true
		},
		nome_completo: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		nome_guerra: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		foto: {
			type: DataTypes.BLOB,
			allowNull: true
		},
		dependente: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		id_alerta: {
			type: DataTypes.INTEGER,
			references: {
				model: {
					tableName: 'alerta'
				},
				key: 'id'
			},
			allowNull: false
		},
		id_unidade: {
			type: DataTypes.INTEGER,
			references: {
				model: {
					tableName: 'unidade'
				},
				key: 'id'
			},
			allowNull: false
		},
		qrcode_efetivo: {
			type: DataTypes.INTEGER,
			references: {
				model: {
					tableName: 'qrcode'
				},
				key: 'qrcode'
			},
			allowNull: false
		},

		email: {
			type: DataTypes.STRING(40),
			allowNull: false
		},
		ativo_efetivo: {
			type: DataTypes.BOOLEAN
		},
		sinc_efetivo: {
			type: DataTypes.BIGINT,
			allowNull: true
		}
	},
	{
		tableName: 'efetivo'
	}
);

export default Efetivo;
