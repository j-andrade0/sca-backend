import { describe, it, expect, afterEach } from 'vitest';
import bcrypt from 'bcrypt';
import usuarioSeed from '../src/seeds/usuario.js';
import Usuario from '../src/models/Usuario.js';
import { api } from './helpers.js';

const clear = () => {
	delete process.env.SEED_ADMIN_USER;
	delete process.env.SEED_ADMIN_PASSWORD;
};

afterEach(clear);

describe('admin seed', () => {
	it('creates no account when the variables are not set', async () => {
		await usuarioSeed();
		expect(await Usuario.count()).toBe(0);
	});

	it('creates no account when only one of them is set', async () => {
		process.env.SEED_ADMIN_USER = '4242';
		await usuarioSeed();
		expect(await Usuario.count()).toBe(0);
	});

	it('creates no account with NODE_ENV=production and no variables', async () => {
		const previous = process.env.NODE_ENV;
		process.env.NODE_ENV = 'production';
		try {
			await usuarioSeed();
			expect(await Usuario.count()).toBe(0);
		} finally {
			process.env.NODE_ENV = previous;
		}
	});

	it('rejects a non-numeric SEED_ADMIN_USER', async () => {
		process.env.SEED_ADMIN_USER = 'root';
		process.env.SEED_ADMIN_PASSWORD = 'x';
		await expect(usuarioSeed()).rejects.toThrow(/integer/);
		expect(await Usuario.count()).toBe(0);
	});

	it('creates the admin with a hashed password and can log in', async () => {
		process.env.SEED_ADMIN_USER = '4242';
		process.env.SEED_ADMIN_PASSWORD = 'a-test-only-password';
		await usuarioSeed();

		const admin = await Usuario.unscoped().findOne({ where: { usuario: 4242 } });
		expect(admin.nivel_acesso).toBe(2);
		expect(admin.senha).not.toBe('a-test-only-password');
		expect(await bcrypt.compare('a-test-only-password', admin.senha)).toBe(true);

		const res = await api().post('/usuarioLogin').send({ usuario: 4242, senha: 'a-test-only-password' });
		expect(res.status).toBe(200);
	});

	it('is idempotent and never overwrites an existing user', async () => {
		process.env.SEED_ADMIN_USER = '4242';
		process.env.SEED_ADMIN_PASSWORD = 'another-password';
		await usuarioSeed();
		expect(await Usuario.count({ where: { usuario: 4242 } })).toBe(1);
		const admin = await Usuario.unscoped().findOne({ where: { usuario: 4242 } });
		expect(await bcrypt.compare('another-password', admin.senha)).toBe(false);
	});
});
