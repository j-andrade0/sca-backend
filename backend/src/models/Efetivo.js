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
				model: 'graduacao',
				key: 'id'
			},
			allowNull: true
		},
		id_posto: {
			type: DataTypes.INTEGER,
			references: {
				model: 'posto',
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
		cpf: {
			type: DataTypes.STRING(11),
			allowNull: false,
			unique: true
		},
		saram: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
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
				model: 'alerta',
				key: 'id'
			},
			allowNull: false
		},
		id_unidade: {
			type: DataTypes.INTEGER,
			references: {
				model: 'unidade',
				key: 'id'
			},
			allowNull: false
		},
		qrcode_efetivo: {
			type: DataTypes.INTEGER,
			references: {
				model: 'qrcode',
				key: 'qrcode'
			},
			allowNull: false
		},
		senha: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		ativo_efetivo: {
			type: DataTypes.BOOLEAN,
			allowNull: true
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
