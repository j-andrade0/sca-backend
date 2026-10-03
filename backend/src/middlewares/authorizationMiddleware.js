// Requires authenticationMiddleware to have run first. The level comes only from the signed JWT payload
// (req.user); the client-controlled `access-level` header is ignored.
// 401 when there is no authenticated user, 403 when the level is not enough.
function verifyAuthorization({ nivel_acesso }) {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(401).json({ message: 'Usuário não autenticado!' });
		}

		if (Number(req.user.nivel_acesso) >= nivel_acesso) {
			return next();
		}

		return res.status(403).json({ message: 'Baixo nível de acesso!' });
	};
}
export default verifyAuthorization;
