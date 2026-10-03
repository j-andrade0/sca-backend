import { describe, it, expect, beforeAll } from 'vitest';
import { buildPagination, paginationParams } from '../src/util/pagination.js';
import { api, loginAdmin } from './helpers.js';

describe('pagination helper', () => {
	it('computes lastPage from the total', () => {
		expect(buildPagination({ path: '/x', page: 1, limit: 10, total: 25 })).toMatchObject({
			lastPage: 3,
			next_page: 2,
			prev_page: false
		});
		expect(buildPagination({ path: '/x', page: 3, limit: 10, total: 25 })).toMatchObject({
			next_page: false,
			prev_page: 2
		});
		expect(buildPagination({ path: '/x', page: 1, limit: 10, total: 10 }).lastPage).toBe(1);
		expect(buildPagination({ path: '/x', page: 1, limit: 10, total: 0 })).toMatchObject({
			lastPage: 1,
			next_page: false
		});
	});

	it('falls back to page 1 for anything that is not a positive integer', () => {
		for (const page of [undefined, 'abc', '0', '-2', '']) {
			expect(paginationParams({ page }).page).toBe(1);
		}
		expect(paginationParams({ page: '3' })).toEqual({ page: 3, limit: 10, offset: 20 });
	});
});

describe('GET /unidade pagination', () => {
	let token;
	beforeAll(async () => {
		({ token } = await loginAdmin());
		for (let i = 1; i <= 25; i++) {
			await api()
				.post('/unidade')
				.set('Authentication', token)
				.send({ nome: `unidade-${i}`, ativo_unidade: true, sinc: i });
		}
	});

	it('reports next_page and lastPage correctly', async () => {
		const first = await api().get('/unidade').set('Authentication', token);
		expect(first.body.entities).toHaveLength(10);
		expect(first.body.pagination).toMatchObject({
			page: 1,
			prev_page: false,
			next_page: 2,
			lastPage: 3,
			totalRegisters: 25
		});

		const second = await api().get('/unidade?page=2').set('Authentication', token);
		expect(second.body.pagination).toMatchObject({ prev_page: 1, next_page: 3 });

		const last = await api().get('/unidade?page=3').set('Authentication', token);
		expect(last.body.entities).toHaveLength(5);
		expect(last.body.pagination).toMatchObject({ prev_page: 2, next_page: false });
	});

	it('does not fail on an invalid page', async () => {
		const res = await api().get('/unidade?page=abc').set('Authentication', token);
		expect(res.status).toBe(200);
		expect(res.body.pagination.page).toBe(1);
	});
});
