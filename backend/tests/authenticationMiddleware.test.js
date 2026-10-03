import { describe, it, expect } from 'vitest';
import authenticate from '../src/middlewares/authenticationMiddleware.js';

describe('authenticationMiddleware', () => {
	it('returns 401 when verification fails with an unexpected error', () => {
		const secret = process.env.JWT_SECRET_KEY;
		delete process.env.JWT_SECRET_KEY; // jwt.verify then throws a plain Error, not a JsonWebTokenError
		try {
			const res = { status: (code) => ({ json: (body) => ({ code, body }), send: (body) => ({ code, body }) }) };
			const out = authenticate({ header: () => 'some.token.value' }, res, () => {
				throw new Error('next must not be called');
			});
			expect(out.code).toBe(401);
		} finally {
			process.env.JWT_SECRET_KEY = secret;
		}
	});
});
