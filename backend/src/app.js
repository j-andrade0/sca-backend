import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import cors from 'cors';
import seed from './seeds/index.js';

try {
	await db.sync(); // await db.sync({ force: true }); to reset database everytime, and await db.sync(); to keep the records
	console.warn('All models were synchronized successfully.');
} catch (error) {
	console.error(error);
}

const app = express();

app.use(cors());
app.use(express.json());

seed()
	.then(() => {
		console.log('Seeds feitas com sucesso');
	})
	.catch((error) => {
		console.error('Erro ao fazer seeds: ', error);
	});

routes(app);

export default app;
