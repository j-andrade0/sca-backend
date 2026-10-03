import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';

// Creates the first administrator (level 2) from SEED_ADMIN_USER / SEED_ADMIN_PASSWORD.
// Nothing is created when either variable is missing, so there is never a default account
// (this is also what happens with NODE_ENV=production and no variables). It never overwrites an existing user.
const usuarioSeed = async () => {
	const { SEED_ADMIN_USER, SEED_ADMIN_PASSWORD } = process.env;

	if (!SEED_ADMIN_USER || !SEED_ADMIN_PASSWORD) {
		console.log('SEED_ADMIN_USER/SEED_ADMIN_PASSWORD não definidos: nenhum administrador foi criado.');
		return;
	}

	const usuario = Number(SEED_ADMIN_USER);
	if (!Number.isInteger(usuario)) {
		throw new Error('SEED_ADMIN_USER must be an integer.');
	}

	const existingUser = await Usuario.findOne({ where: { usuario } });

	if (existingUser) {
		console.log(`Já existe o usuário ${usuario}; o seed não altera usuários existentes.`);
		return;
	}

	await Usuario.create({
		usuario,
		senha: await bcrypt.hash(SEED_ADMIN_PASSWORD, 10),
		nivel_acesso: 2,
		flag: 1
	});

	console.log(`Administrador ${usuario} criado a partir das variáveis de ambiente.`);
};

export default usuarioSeed;
