import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { buildCorsOptions } from '../src/config/corsConfig.js';

describe('buildCorsOptions', () => {
	it('sends no CORS headers when CORS_ORIGIN is not set', () => {
		expect(buildCorsOptions('')).toEqual({ origin: false });
		expect(buildCorsOptions(undefined)).toEqual({ origin: false });
	});

	it('parses a comma-separated allowlist and the wildcard', () => {
		expect(buildCorsOptions('http://a.example, http://b.example')).toEqual({
			origin: ['http://a.example', 'http://b.example']
		});
		expect(buildCorsOptions('*')).toEqual({ origin: '*' });
	});
});

describe('CORS on the API (CORS_ORIGIN=http://allowed.example)', () => {
	let app;
	beforeAll(async () => {
		process.env.CORS_ORIGIN = 'http://allowed.example';
		({ default: app } = await import('../src/app.js'));
	});

	it('allows the configured origin', async () => {
		const res = await request(app).get('/doc/').set('Origin', 'http://allowed.example');
		expect(res.headers['access-control-allow-origin']).toBe('http://allowed.example');
	});

	it('does not allow another origin', async () => {
		const res = await request(app).get('/doc/').set('Origin', 'http://evil.example');
		expect(res.headers['access-control-allow-origin']).toBeUndefined();
	});

	it('answers the preflight for the custom Authentication header', async () => {
		const res = await request(app)
			.options('/unidade')
			.set('Origin', 'http://allowed.example')
			.set('Access-Control-Request-Method', 'GET')
			.set('Access-Control-Request-Headers', 'Authentication');
		expect(res.status).toBe(204);
		expect(res.headers['access-control-allow-origin']).toBe('http://allowed.example');
		expect(res.headers['access-control-allow-headers']).toMatch(/authentication/i);
	});
});
