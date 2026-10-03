import jwt from 'jsonwebtoken';

// The access level is part of the signed token payload.
export function signAccessToken({ id, tipo, nivel_acesso }) {
	return jwt.sign({ id, tipo, nivel_acesso }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
}
