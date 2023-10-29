import { DataTypes } from 'sequelize';
import db from '../config/dbConnect.js';

const Sincronismo = db.define(
	'Sincronismo',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		sinc_pessoa_geral: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		sinc_posto_geral: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		sinc_dependente_geral: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		sinc_veiculo_geral: {
			type: DataTypes.BIGINT,
			allowNull: false
		}
	},
	{
		tableName: 'sincronismo'
	}
);

export default Sincronismo;
