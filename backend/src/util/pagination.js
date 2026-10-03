const DEFAULT_LIMIT = 10;

// Reads ?page= from the query string. Anything that is not a positive integer falls back to page 1.
export function paginationParams(query, limit = DEFAULT_LIMIT) {
	const parsed = Number.parseInt(query.page, 10);
	const page = Number.isInteger(parsed) && parsed >= 1 ? parsed : 1;
	return { page, limit, offset: (page - 1) * limit };
}

export function buildPagination({ path, page, limit = DEFAULT_LIMIT, total }) {
	const lastPage = Math.max(1, Math.ceil(total / limit));
	return {
		path,
		page,
		prev_page: page > 1 ? page - 1 : false,
		next_page: page < lastPage ? page + 1 : false,
		lastPage,
		totalRegisters: total
	};
}
