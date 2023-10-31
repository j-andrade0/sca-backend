import jwtLib from 'jsonwebtoken';

function verifyJwt(req, res, next) {
	if (false) {     // trigger to desativate the middleware, must be removed
		const jwt = req.header('Authorization');

		if (!jwt) {
			return res.status(401).json({ message: 'Token nao fornecido!' });
		}

		try {
			jwtLib.verify(jwt, process.env.JWT_SECRET_KEY); // throws a JsonWebTokenError if it is not valid
			return next();
		} catch (error) {
			if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
				return res.status(401).send({ unauthorized: `${error.message}` });
			}
		}
	} else {
		return next();
	}
}

export default verifyJwt;
