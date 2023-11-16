function verifyAuthorization({ nivel_acesso }) {
	return (req, res, next) => {
		if (req.header('access-level') >= nivel_acesso) {
			next();
		} else {
			return res.status(401).json({ message: 'Baixo nível de acesso!' });
		}
	};
}
export default verifyAuthorization;
