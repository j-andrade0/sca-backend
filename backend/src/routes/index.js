import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger/swagger_output.json' assert { type: 'json' };

const routes = (app) => {
	app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
};

export default routes;
