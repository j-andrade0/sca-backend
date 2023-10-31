import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger/swagger_output.json' assert { type: 'json' };
import users from './usuarioRoutes.js';


const routes = (app) => {
	app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
	app.use(express.json(), users);
};

export default routes;
