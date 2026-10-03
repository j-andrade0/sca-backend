import { describe, it, expect, beforeAll } from 'vitest';
import { api, loginAdmin, loginUsuario, PASSWORD } from './helpers.js';

const AUTH = 'Authentication';
let admin;

beforeAll(async () => {
	admin = await loginAdmin();
});

describe('PUT /usuario/:id', () => {
	const makeUsuario = async () => {
		const { usuario } = await loginUsuario(1);
		const list = await api().get('/usuario').set(AUTH, admin.token);
		const row = list.body.entities.find((e) => e.usuario === usuario);
		return { usuario, id: row.id };
	};

	it('updates the password when one is sent (the key sent to the database was not a column)', async () => {
		const { usuario, id } = await makeUsuario();
		const res = await api().put(`/usuario/${id}`).set(AUTH, admin.token).send({ senha: 'a-new-password-1' });
		expect(res.status).toBe(200);

		expect((await api().post('/usuarioLogin').send({ usuario, senha: PASSWORD })).status).toBe(401);
		expect((await api().post('/usuarioLogin').send({ usuario, senha: 'a-new-password-1' })).status).toBe(200);
	});

	it('keeps the current password when none is sent', async () => {
		const { usuario, id } = await makeUsuario();
		const res = await api().put(`/usuario/${id}`).set(AUTH, admin.token).send({ flag: false });
		expect(res.status).toBe(200);
		expect((await api().post('/usuarioLogin').send({ usuario, senha: PASSWORD })).status).toBe(200);
	});
});
