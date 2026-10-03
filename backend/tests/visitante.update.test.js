import { describe, it, expect, beforeAll } from 'vitest';
import { api, loginAdmin, loginVisitante, PASSWORD } from './helpers.js';

const AUTH = 'Authentication';
let admin;

beforeAll(async () => {
	admin = await loginAdmin();
});

describe('PUT /visitante/:id', () => {
	it('updates a visitante without requiring a new password', async () => {
		const { created } = await loginVisitante(admin.token, 1);
		const id = created.body.id;
		const res = await api().put(`/visitante/${id}`).set(AUTH, admin.token).send({ nome: 'Outro Nome' });
		expect(res.status).toBe(200);
		const after = await api().get(`/visitante/${id}`).set(AUTH, admin.token);
		expect(after.body.nome).toBe('Outro Nome');
	});

	it('changes the password only when one is sent', async () => {
		const { created } = await loginVisitante(admin.token, 1);
		const { id, email } = created.body;
		await api().put(`/visitante/${id}`).set(AUTH, admin.token).send({ senha: 'visitor-new-pass-1' });
		expect((await api().post('/visitanteLogin').send({ email, senha: PASSWORD })).status).toBe(401);
		expect((await api().post('/visitanteLogin').send({ email, senha: 'visitor-new-pass-1' })).status).toBe(200);
	});
});
