import jwt from 'jsonwebtoken';

// The access level is signed inside the token: the server never trusts a level sent by the client.
export function signAccessToken({ id, tipo, nivel_acesso }) {
	return jwt.sign({ id, tipo, nivel_acesso }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
}
