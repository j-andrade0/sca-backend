// CORS_ORIGIN: comma-separated list of allowed origins, or * to allow any origin.
// When it is not set no CORS headers are sent, so browsers on other origins are refused (safe default).
export function buildCorsOptions(value = process.env.CORS_ORIGIN) {
	const origins = (value || '')
		.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean);

	if (origins.length === 0) {
		return { origin: false };
	}
	if (origins.includes('*')) {
		return { origin: '*' };
	}
	return { origin: origins };
}

export default buildCorsOptions;
