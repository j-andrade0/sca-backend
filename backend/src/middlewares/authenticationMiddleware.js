import jwtLib from 'jsonwebtoken';

// Verifies the JWT sent in the Authentication header and exposes its payload as req.user
// ({ id, tipo, nivel_acesso }). 401 for a missing or invalid token.
function verifyJwt(req, res, next) {
	const jwt = req.header('Authentication');

	if (!jwt) {
		return res.status(401).json({ message: 'Token nao fornecido!' });
	}

	try {
		req.user = jwtLib.verify(jwt, process.env.JWT_SECRET_KEY); // throws a JsonWebTokenError if it is not valid
		return next();
	} catch (error) {
		if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
			return res.status(401).send({ unauthorized: `${error.message}` });
		}
		// Anything else (e.g. a missing secret) must not leave the request hanging.
		return res.status(401).send({ unauthorized: 'Unauthorized' });
	}
}

export default verifyJwt;
