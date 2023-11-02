import NoEntityError from './customErrors/NoEntityError.js';
import bcrypt from 'bcrypt';

async function verifyPassword(entity, senha) {
	if (!entity) {
		throw new NoEntityError('Entidade não cadastrada!');
	}
	const isPasswordValid = await bcrypt.compare(senha, entity.senha);
	return isPasswordValid;
}

export default verifyPassword;
