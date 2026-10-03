import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['tests/**/*.test.js'],
		globalSetup: ['./tests/globalSetup.js'],
		// Tests run against an in-memory SQLite database (see src/config/dbConnect.js).
		env: { DB_DIALECT: 'sqlite', JWT_SECRET_KEY: 'test-signing-key', NODE_ENV: 'test' }
	}
});
