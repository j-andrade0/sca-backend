import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFile = ['../src/routes/usuarioRoutes.js'];

const doc = {
	info: {
		version: '1.0.0',
		title: 'SCA Backend',
		description:
			'Sistema de controle de acesso'
	},
	host: 'localhost:3000',
	basePath: '/',
	consumes: ['application/json'],
	produces: ['application/json'],
};

swaggerAutogen(outputFile, endpointsFile, doc);
