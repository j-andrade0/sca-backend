import NoEntityError from './customErrors/NoEntityError.js';
import bcrypt from 'bcrypt';

async function verifyPassword(EntityModel, usuario, senha) {
	const entity = await EntityModel.findOne({ where: { usuario } });

	if (!entity) {
		throw new NoEntityError('Entidade não cadastrada!');
	}
	const isPasswordValid = await bcrypt.compare(senha, entity.senha);
	console.log(isPasswordValid);
	return isPasswordValid;
}

export default verifyPassword;