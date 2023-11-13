function verifyAuthorization({nivel_acesso}) {
	return (req, res, next) => {
		if (true) { // trigger to desativate the middleware, must be removed
			if (req.header('access-level') >= nivel_acesso) {
				next();
			} else {
				return res.status(401).json({ message: 'Baixo nível de acesso!' });
			}
		} else {
			next();
		}
	};
}
export default verifyAuthorization;
