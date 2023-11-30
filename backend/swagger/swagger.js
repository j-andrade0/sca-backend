import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFile = [
	'../src/routes/usuarioRoutes.js',
	'../src/routes/efetivoRoutes.js',
	'../src/routes/graduacaoRoutes.js',
	'../src/routes/postoRoutes.js',
	'../src/routes/qrcodeRoutes.js',
	'../src/routes/registroAcessoRoutes.js',
	'../src/routes/sincronismoRoutes.js',
	'../src/routes/unidadeRoutes.js',
	'../src/routes/veiculoRoutes.js',
	'../src/routes/visitanteRoutes.js',
	'../src/routes/alertaRoutes.js',
	'../src/routes/dependenteRoutes.js',
	'../src/routes/cartaoVacinaRoutes.js'
];

const doc = {
	info: {
		version: '1.2.0',
		title: 'SCA Backend',
		description: 'Sistema de controle de acesso'
	},
	host: 'localhost:3000',
	basePath: '/',
	consumes: ['application/json'],
	produces: ['application/json'],
	securityDefinitions: {
		apiKey: {
			type: 'apiKey',
			name: 'Authentication',
			in: 'header'
		},
		accessLevel: {
			type: 'apiKey',
			name: 'access-level',
			in: 'header'
		}
	},
	security: [{ apiKey: [] }, { accessLevel: [] }]
};

swaggerAutogen(outputFile, endpointsFile, doc);
