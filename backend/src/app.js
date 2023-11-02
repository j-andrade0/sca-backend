import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';

try {
	await db.sync(); // await db.sync({ force: true }); to reset database everytime, and await db.sync(); to keep the records
	console.warn('All models were synchronized successfully.');
} catch (error) {
	console.error(error);
}

const app = express();
app.use(express.json());
routes(app);

export default app;
