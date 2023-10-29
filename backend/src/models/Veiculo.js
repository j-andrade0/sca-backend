import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Veiculo = db.define(
	'Veiculo',
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
				model: {
					tableName: 'efetivo'
				},
				key: 'id'
			},
			allowNull: true
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
		tipo: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		cor_veiculo: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		placa: {
			type: DataTypes.STRING(7),
			allowNull: true
		},
		modelo: {
			type: DataTypes.STRING(40),
			allowNull: true
		},
		renavam: {
			type: DataTypes.BIGINT(13),
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
			allowNull: true
		},

		ativo_veiculo: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},

		sinc_veiculo: {
			type: DataTypes.BIGINT,
			allowNull: true
		}
	},
	{
		tableName: 'veiculo'
	}
);

export default Veiculo;
