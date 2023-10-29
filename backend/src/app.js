import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import Alerta from './models/Alerta.js';
import Depentende from './models/Dependente.js';
import Efetivo from './models/Efetivo.js';
import Graduacao from './models/Graduacao.js';
import Posto from './models/Posto.js';
import QRCode from './models/QrCode.js';
import Sincronismo from './models/Sincronismo.js';
import Unidade from './models/Unidade.js';
import Veiculo from './models/Veiculo.js';
import Visitante from './models/Visitante.js';
import RegistroAcesso from './models/Registro_Acesso.js';

try {
	await db.sync({ force: true }); // await db.sync({ force: true }); to reset database everytime, and await db.sync(); to keep the records
	console.warn('All models were synchronized successfully.');
} catch (error) {
	console.error(error);
}

const app = express();
app.use(express.json());
routes(app);

export default app;
