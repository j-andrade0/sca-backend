class NoEntityError extends Error {
	constructor(message) {
		super(message);
		this.name = 'NoEntityError';
	}
}

export default NoEntityError;