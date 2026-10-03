import bcrypt from 'bcrypt';
import request from 'supertest';
import app from '../src/app.js';
import Usuario from '../src/models/Usuario.js';

let counter = 0;
const unique = () => Date.now() * 1000 + (counter++ % 1000);

export const api = () => request(app);

export const PASSWORD = 'test-password-123';

// Creates a Usuario straight in the database and returns a token obtained through the real login endpoint.
export async function loginUsuario(nivel_acesso) {
	const usuario = unique() % 1000000000; // INTEGER column
	await Usuario.create({ usuario, senha: await bcrypt.hash(PASSWORD, 4), nivel_acesso, flag: true });
	const res = await api().post('/usuarioLogin').send({ usuario, senha: PASSWORD });
	return { token: res.body.jwtToken, usuario, res };
}

export const loginAdmin = () => loginUsuario(2);
export const loginRegular = () => loginUsuario(1);

export async function createUnidade(adminToken) {
	const res = await api()
		.post('/unidade')
		.set('Authentication', adminToken)
		.send({ nome: `Unidade ${unique()}`, ativo_unidade: true, sinc: 1 });
	return res.body.id;
}

// Creates a visitante through the API (as admin) with the given access level (stored on its QRCode) and logs it in.
export async function loginVisitante(adminToken, nivel_acesso) {
	const id = unique();
	const email = `visitante${id}@example.com`;
	const created = await api()
		.post('/visitante')
		.set('Authentication', adminToken)
		.send({
			email,
			senha: PASSWORD,
			tipo_doc: 'RG',
			num_doc: String(id).slice(-10),
			nome: 'Visitante Teste',
			rua: 'Rua 1',
			numero: '1',
			bairro: 'Centro',
			estado: 'GO',
			nivel_acesso,
			ativo_visitante: true
		});
	const res = await api().post('/visitanteLogin').send({ email, senha: PASSWORD });
	return { token: res.body.jwtToken, created, res };
}

// Creates an efetivo through the API (as admin) with the given access level (stored on its QRCode) and logs it in.
export async function loginEfetivo(adminToken, nivel_acesso) {
	const id = unique();
	const cpf = String(id).slice(-11).padStart(11, '0');
	const id_unidade = await createUnidade(adminToken);
	const created = await api()
		.post('/efetivo')
		.set('Authentication', adminToken)
		.send({
			nome_completo: 'Efetivo Teste',
			nome_guerra: 'Teste',
			cpf,
			saram: `s${id}`,
			id_unidade,
			senha: PASSWORD,
			nivel_acesso,
			ativo_efetivo: true
		});
	const res = await api().post('/efetivoLogin').send({ cpf, senha: PASSWORD });
	return { token: res.body.jwtToken, created, res };
}
