import { describe, it, expect, beforeAll } from 'vitest';
import { api, loginAdmin, loginEfetivo, loginVisitante, createUnidade, PASSWORD } from './helpers.js';
import QRCode from '../src/models/QRCode.js';
import Alerta from '../src/models/Alerta.js';
import Efetivo from '../src/models/Efetivo.js';

const AUTH = 'Authentication';
let admin;

beforeAll(async () => {
	admin = await loginAdmin();
});

describe('creating an efetivo', () => {
	it('generates its QR Code (with the given level) and a "criação" alert automatically', async () => {
		const { created } = await loginEfetivo(admin.token, 2);
		expect(created.status).toBe(201);

		const efetivo = await Efetivo.findByPk(created.body.id);
		const qrcode = await QRCode.findByPk(efetivo.qrcode_efetivo);
		expect(qrcode).not.toBeNull();
		expect(qrcode.entity).toBe('efetivo');
		expect(qrcode.nivel_acesso).toBe(2);

		const alerta = await Alerta.findByPk(efetivo.id_alerta);
		expect(alerta).not.toBeNull();
		expect(alerta.nome_alerta).toBe('criação');
		expect(alerta.ativo_alerta).toBe(true);
	});

	it('is resolvable through GET /qrcode/:qrcode', async () => {
		const { created } = await loginEfetivo(admin.token, 1);
		const res = await api().get(`/qrcode/${created.body.qrcode_efetivo}`).set(AUTH, admin.token);
		expect(res.status).toBe(200);
		expect(res.body.efetivo.id).toBe(created.body.id);
	});

	it('removes the QR Code and the alert when the creation does not complete (duplicate cpf)', async () => {
		const { created } = await loginEfetivo(admin.token, 1);
		const before = { qrcodes: await QRCode.count(), alertas: await Alerta.count() };

		const duplicate = await api()
			.post('/efetivo')
			.set(AUTH, admin.token)
			.send({
				nome_completo: 'Duplicado',
				nome_guerra: 'Dup',
				cpf: created.body.cpf,
				saram: 'another-saram',
				id_unidade: await createUnidade(admin.token),
				senha: PASSWORD,
				nivel_acesso: 1
			});
		expect(duplicate.status).toBe(400);

		// the cleanup in the controller is not awaited, so give it a moment
		await new Promise((resolve) => setTimeout(resolve, 200));
		expect(await QRCode.count()).toBe(before.qrcodes);
		expect(await Alerta.count()).toBe(before.alertas);
	});
});

describe('creating a visitante', () => {
	it('generates its QR Code with the given level', async () => {
		const { created } = await loginVisitante(admin.token, 1);
		expect(created.status).toBe(201);
		const qrcode = await QRCode.findByPk(created.body.qrcode_visitante);
		expect(qrcode.entity).toBe('visitante');
		expect(qrcode.nivel_acesso).toBe(1);
	});
});
