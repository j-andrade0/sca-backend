import { describe, it, expect, beforeAll } from 'vitest';
import { api, loginAdmin, loginUsuario, loginEfetivo, loginVisitante, PASSWORD } from './helpers.js';
import Usuario from '../src/models/Usuario.js';

let admin;

beforeAll(async () => {
	admin = await loginAdmin();
});

describe('usuario login', () => {
	it('returns a token and the entity without the password', async () => {
		const { res } = await loginUsuario(1);
		expect(res.status).toBe(200);
		expect(res.body.jwtToken).toBeTypeOf('string');
		expect(res.body.entity.senha).toBeUndefined();
		expect(res.body.entity.nivel_acesso).toBe(1);
	});

	it('rejects a wrong password with 401 and no token', async () => {
		const { usuario } = await loginUsuario(1);
		const res = await api().post('/usuarioLogin').send({ usuario, senha: 'wrong-password' });
		expect(res.status).toBe(401);
		expect(res.body.jwtToken).toBeUndefined();
	});

	it('rejects an unknown usuario without a token', async () => {
		const res = await api().post('/usuarioLogin').send({ usuario: 999999999, senha: PASSWORD });
		expect(res.status).toBeGreaterThanOrEqual(400);
		expect(res.body.jwtToken).toBeUndefined();
	});

	it('stores the password hashed', async () => {
		const { usuario } = await loginUsuario(1);
		const row = await Usuario.unscoped().findOne({ where: { usuario } });
		expect(row.senha).not.toBe(PASSWORD);
		expect(row.senha).toMatch(/^\$2[aby]\$/);
	});
});

describe('efetivo login', () => {
	it('logs in with cpf and password; a wrong password gets 401', async () => {
		const { res, created } = await loginEfetivo(admin.token, 1);
		expect(res.status).toBe(200);
		expect(res.body.entity.senha).toBeUndefined();

		const bad = await api().post('/efetivoLogin').send({ cpf: created.body.cpf, senha: 'wrong-password' });
		expect(bad.status).toBe(401);
	});
});

describe('visitante login', () => {
	it('logs in with e-mail and password; a wrong password gets 401', async () => {
		const { res, created } = await loginVisitante(admin.token, 1);
		expect(res.status).toBe(200);
		expect(res.body.entity.senha).toBeUndefined();

		const bad = await api().post('/visitanteLogin').send({ email: created.body.email, senha: 'wrong-password' });
		expect(bad.status).toBe(401);
	});
});
