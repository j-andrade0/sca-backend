import { Sequelize } from 'sequelize';

// DB_DIALECT=sqlite runs against an in-memory SQLite database (used by the automated tests);
// the default is MySQL, configured through the DB_* variables.
const db =
	process.env.DB_DIALECT === 'sqlite'
		? new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false, define: { timestamps: true } })
		: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
				host: 'localhost',
				dialect: 'mysql',
				define: {
					timestamps: true // if you don`t want the field created at, and updated at, set this to false
				}
			});

try {
	await db.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

export default db;
