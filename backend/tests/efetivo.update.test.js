import { describe, it, expect, beforeAll } from 'vitest';
import { api, loginAdmin, loginEfetivo } from './helpers.js';

const AUTH = 'Authentication';
let admin;

beforeAll(async () => {
	admin = await loginAdmin();
});

describe('PUT /efetivo/:id', () => {
	it('updates the efetivo (it used to throw a ReferenceError on every PUT)', async () => {
		const { created } = await loginEfetivo(admin.token, 1);
		expect(created.status).toBe(201);
		const id = created.body.id;

		const res = await api().put(`/efetivo/${id}`).set(AUTH, admin.token).send({ nome_guerra: 'Novo' });
		expect(res.status).toBe(200);

		const after = await api().get(`/efetivo/${id}`).set(AUTH, admin.token);
		expect(after.body.nome_guerra).toBe('Novo');
		expect(after.body.senha).toBeUndefined();
	});
});
