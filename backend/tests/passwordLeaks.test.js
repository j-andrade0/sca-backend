import { describe, it, expect, beforeAll } from 'vitest';
import { api, loginAdmin, loginUsuario, loginEfetivo, loginVisitante, PASSWORD } from './helpers.js';

const AUTH = 'Authentication';

// True when the JSON contains a `senha` key or a bcrypt hash anywhere.
const leaksPassword = (value) => JSON.stringify(value).match(/"senha"|\$2[aby]\$/) !== null;

let admin;
let efetivo; // { id, qrcode }
let visitante; // { id, qrcode }
let usuarioId;

beforeAll(async () => {
	admin = await loginAdmin();

	const e = await loginEfetivo(admin.token, 1);
	efetivo = { id: e.created.body.id, qrcode: e.created.body.qrcode_efetivo };
	const v = await loginVisitante(admin.token, 1);
	visitante = { id: v.created.body.id, qrcode: v.created.body.qrcode_visitante };

	const { usuario } = await loginUsuario(1);
	const list = await api().get('/usuario').set(AUTH, admin.token);
	usuarioId = list.body.entities.find((u) => u.usuario === usuario).id;

	const vacina = await api().post('/cartoesvacina').set(AUTH, admin.token).send({
		efetivoId: efetivo.id,
		doenca: 'Gripe',
		vacina: 'Influenza',
		dose: 1,
		data_aplicacao: '2024-01-10'
	});
	expect(vacina.status).toBe(201);
	efetivo.cartaoId = vacina.body.id;
});

describe('no endpoint returns a password hash', () => {
	it.each([
		['GET /usuario', () => api().get('/usuario').set(AUTH, admin.token)],
		['GET /usuario/:id', () => api().get(`/usuario/${usuarioId}`).set(AUTH, admin.token)],
		['GET /efetivo', () => api().get('/efetivo').set(AUTH, admin.token)],
		['GET /efetivo/:id', () => api().get(`/efetivo/${efetivo.id}`).set(AUTH, admin.token)],
		['GET /visitante', () => api().get('/visitante').set(AUTH, admin.token)],
		['GET /visitante/:id', () => api().get(`/visitante/${visitante.id}`).set(AUTH, admin.token)],
		['GET /qrcode/:qrcode (efetivo)', () => api().get(`/qrcode/${efetivo.qrcode}`).set(AUTH, admin.token)],
		['GET /qrcode/:qrcode (visitante)', () => api().get(`/qrcode/${visitante.qrcode}`).set(AUTH, admin.token)],
		['GET /cartoesvacina', () => api().get('/cartoesvacina').set(AUTH, admin.token)],
		['GET /cartoesvacina/:id', () => api().get(`/cartoesvacina/${efetivo.cartaoId}`).set(AUTH, admin.token)]
	])('%s', async (_name, call) => {
		const res = await call();
		expect(res.status).toBe(200);
		expect(leaksPassword(res.body)).toBe(false);
	});

	it('the login responses do not contain the hash either, but the passwords still work', async () => {
		const { usuario } = await loginUsuario(1);
		const res = await api().post('/usuarioLogin').send({ usuario, senha: PASSWORD });
		expect(res.status).toBe(200);
		expect(leaksPassword(res.body.entity)).toBe(false);
	});
});
