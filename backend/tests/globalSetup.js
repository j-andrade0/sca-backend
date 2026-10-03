import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// src/routes/index.js imports the generated Swagger file, so make sure it exists.
export default function setup() {
	if (!existsSync('./swagger/swagger_output.json')) {
		execFileSync(process.execPath, ['./swagger/swagger.js'], { stdio: 'inherit' });
	}
}
