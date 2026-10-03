import { describe, it, expect, beforeAll } from 'vitest';
import jwt from 'jsonwebtoken';
import { api, loginAdmin, loginRegular, loginVisitante, loginEfetivo, createUnidade } from './helpers.js';

const AUTH = 'Authentication';

let admin;

beforeAll(async () => {
	admin = await loginAdmin();
	expect(admin.res.status).toBe(200);
});

describe('authentication (401)', () => {
	it('rejects a request without a token', async () => {
		const res = await api().get('/unidade');
		expect(res.status).toBe(401);
	});

	it('rejects a malformed token', async () => {
		const res = await api().get('/unidade').set(AUTH, 'not-a-jwt');
		expect(res.status).toBe(401);
	});

	it('rejects a token signed with another secret', async () => {
		const forged = jwt.sign({ id: 1, nivel_acesso: 2 }, 'another-secret');
		const res = await api().get('/unidade').set(AUTH, forged);
		expect(res.status).toBe(401);
	});

	it('rejects an expired token', async () => {
		const expired = jwt.sign({ id: 1, nivel_acesso: 2 }, process.env.JWT_SECRET_KEY, { expiresIn: -10 });
		const res = await api().get('/unidade').set(AUTH, expired);
		expect(res.status).toBe(401);
	});
});

describe('authorization (403) uses the level signed inside the JWT', () => {
	it('the login embeds the access level in the token', async () => {
		const payload = jwt.verify(admin.token, process.env.JWT_SECRET_KEY);
		expect(payload).toMatchObject({ tipo: 'usuario', nivel_acesso: 2 });
	});

	it('lets an admin (level 2) in, with or without the legacy access-level header', async () => {
		expect((await api().get('/unidade').set(AUTH, admin.token)).status).toBe(200);
		expect((await api().get('/unidade').set(AUTH, admin.token).set('access-level', '0')).status).toBe(200);
	});

	it('answers 403 to a regular user (level 1) on an admin route', async () => {
		const { token } = await loginRegular();
		const res = await api().get('/unidade').set(AUTH, token);
		expect(res.status).toBe(403);
	});

	it('a forged access-level header does not escalate a regular user (read)', async () => {
		const { token } = await loginRegular();
		const res = await api().get('/unidade').set(AUTH, token).set('access-level', '99');
		expect(res.status).toBe(403);
	});

	it('a forged access-level header does not escalate a regular user (write)', async () => {
		const { token } = await loginRegular();
		const res = await api()
			.post('/unidade')
			.set(AUTH, token)
			.set('access-level', '99')
			.send({ nome: 'Unidade forjada', ativo_unidade: true, sinc: 1 });
		expect(res.status).toBe(403);
		const list = await api().get('/unidade').set(AUTH, admin.token);
		expect(list.body.entities.map((u) => u.nome)).not.toContain('Unidade forjada');
	});

	it('a token without a level (e.g. issued before this fix) is refused', async () => {
		const legacy = jwt.sign({ id: admin.usuario }, process.env.JWT_SECRET_KEY);
		const res = await api().get('/unidade').set(AUTH, legacy).set('access-level', '99');
		expect(res.status).toBe(403);
	});

	it('an efetivo gets the level of its QRCode: level 1 cannot escalate, level 2 can', async () => {
		const low = await loginEfetivo(admin.token, 1);
		expect(low.res.status).toBe(200);
		expect(jwt.verify(low.token, process.env.JWT_SECRET_KEY)).toMatchObject({ tipo: 'efetivo', nivel_acesso: 1 });
		expect((await api().get('/unidade').set(AUTH, low.token).set('access-level', '99')).status).toBe(403);

		const high = await loginEfetivo(admin.token, 2);
		expect(jwt.verify(high.token, process.env.JWT_SECRET_KEY)).toMatchObject({ tipo: 'efetivo', nivel_acesso: 2 });
		expect((await api().get('/unidade').set(AUTH, high.token)).status).toBe(200);
	});

	it('a visitante gets the level of its QRCode: level 1 cannot escalate, level 2 can', async () => {
		const low = await loginVisitante(admin.token, 1);
		expect(low.res.status).toBe(200);
		expect(jwt.verify(low.token, process.env.JWT_SECRET_KEY)).toMatchObject({ tipo: 'visitante', nivel_acesso: 1 });
		expect((await api().get('/unidade').set(AUTH, low.token).set('access-level', '99')).status).toBe(403);

		const high = await loginVisitante(admin.token, 2);
		expect(jwt.verify(high.token, process.env.JWT_SECRET_KEY)).toMatchObject({
			tipo: 'visitante',
			nivel_acesso: 2
		});
		expect((await api().get('/unidade').set(AUTH, high.token)).status).toBe(200);
	});

	it('creating a unidade as admin still works (sanity check of the helpers)', async () => {
		expect(await createUnidade(admin.token)).toBeTypeOf('number');
	});
});
