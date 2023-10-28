import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const RegistroAcesso = db.define(
	'RegistroAcesso',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},

		tipo: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		data: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		hora: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},

		id_posto: {
			type: DataTypes.INTEGER,
			references: {
				model: {
					tableName: 'posto'
				},
				key: 'id'
			},
			allowNull: false
		},

		qrcode: {
			type: DataTypes.INTEGER,
			references: {
				model: {
					tableName: 'qrcode'
				},
				key: 'qrcode'
			},
			allowNull: false
		},
		id_visitante: {
			type: DataTypes.INTEGER,
			references: {
				model: {
					tableName: 'visitante'
				},
				key: 'id'
			},
			allowNull: true
		},
		id_dependente: {
			type: DataTypes.INTEGER,
			references: {
				model: {
					tableName: 'dependente'
				},
				key: 'id'
			},
			allowNull: true
		},
		id_veiculo: {
			type: DataTypes.INTEGER,
			references: {
				model: {
					tableName: 'veiculo'
				},
				key: 'id'
			},
			allowNull: true
		},
		autorizador: {
			type: DataTypes.STRING(30),
			allowNull: true
		},

		sinc_acesso: {
			type: DataTypes.BIGINT,
			allowNull: true
		}
	},
	{
		tableName: 'RegistroAcessos'
	}
);

export default RegistroAcesso;