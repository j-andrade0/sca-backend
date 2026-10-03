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
	it('returns 401 without a token', async () => {
		const res = await api().get('/unidade');
		expect(res.status).toBe(401);
	});

	it('returns 401 for a malformed token', async () => {
		const res = await api().get('/unidade').set(AUTH, 'not-a-jwt');
		expect(res.status).toBe(401);
	});

	it('returns 401 for a token signed with a different key', async () => {
		const foreignToken = jwt.sign({ id: 1, nivel_acesso: 2 }, 'another-key');
		const res = await api().get('/unidade').set(AUTH, foreignToken);
		expect(res.status).toBe(401);
	});

	it('returns 401 for an expired token', async () => {
		const expired = jwt.sign({ id: 1, nivel_acesso: 2 }, process.env.JWT_SECRET_KEY, { expiresIn: -10 });
		const res = await api().get('/unidade').set(AUTH, expired);
		expect(res.status).toBe(401);
	});
});

describe('authorization (403) uses the level signed inside the JWT', () => {
	it('the login puts the access level in the token', async () => {
		const payload = jwt.verify(admin.token, process.env.JWT_SECRET_KEY);
		expect(payload).toMatchObject({ tipo: 'usuario', nivel_acesso: 2 });
	});

	it('returns 200 for a level-2 user, with or without the legacy access-level header', async () => {
		expect((await api().get('/unidade').set(AUTH, admin.token)).status).toBe(200);
		expect((await api().get('/unidade').set(AUTH, admin.token).set('access-level', '0')).status).toBe(200);
	});

	it('returns 403 for a level-1 user on a level-2 route', async () => {
		const { token } = await loginRegular();
		const res = await api().get('/unidade').set(AUTH, token);
		expect(res.status).toBe(403);
	});

	it('returns 403 on a read for a level-1 token, whatever access-level header is sent', async () => {
		const { token } = await loginRegular();
		const res = await api().get('/unidade').set(AUTH, token).set('access-level', '99');
		expect(res.status).toBe(403);
	});

	it('returns 403 on a write for a level-1 token, whatever access-level header is sent', async () => {
		const { token } = await loginRegular();
		const res = await api()
			.post('/unidade')
			.set(AUTH, token)
			.set('access-level', '99')
			.send({ nome: 'Unidade de teste', ativo_unidade: true, sinc: 1 });
		expect(res.status).toBe(403);
		const list = await api().get('/unidade').set(AUTH, admin.token);
		expect(list.body.entities.map((u) => u.nome)).not.toContain('Unidade de teste');
	});

	it('returns 403 when the token carries no access level', async () => {
		const legacy = jwt.sign({ id: admin.usuario }, process.env.JWT_SECRET_KEY);
		const res = await api().get('/unidade').set(AUTH, legacy).set('access-level', '99');
		expect(res.status).toBe(403);
	});

	it('an efetivo gets the level of its QRCode: 403 for level 1, 200 for level 2', async () => {
		const low = await loginEfetivo(admin.token, 1);
		expect(low.res.status).toBe(200);
		expect(jwt.verify(low.token, process.env.JWT_SECRET_KEY)).toMatchObject({ tipo: 'efetivo', nivel_acesso: 1 });
		expect((await api().get('/unidade').set(AUTH, low.token).set('access-level', '99')).status).toBe(403);

		const high = await loginEfetivo(admin.token, 2);
		expect(jwt.verify(high.token, process.env.JWT_SECRET_KEY)).toMatchObject({ tipo: 'efetivo', nivel_acesso: 2 });
		expect((await api().get('/unidade').set(AUTH, high.token)).status).toBe(200);
	});

	it('a visitante gets the level of its QRCode: 403 for level 1, 200 for level 2', async () => {
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

	it('creates a unidade as admin (helper check)', async () => {
		expect(await createUnidade(admin.token)).toBeTypeOf('number');
	});
});
