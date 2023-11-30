import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get(
	'/usuario',
	authenticationMiddleware,
	authorizationMiddleware({ nivel_acesso: 2 }),
	UsuarioController.getAllEntities,
	() => {
		/* #swagger.tags = ['Usuario']*/
	}
);

router.get(
	'/usuario/:id',
	authenticationMiddleware,
	authorizationMiddleware({ nivel_acesso: 2 }),
	UsuarioController.getEntityById,
	() => {
		/* #swagger.tags = ['Usuario']*/
	}
);

router.post(
	'/usuario',
	authenticationMiddleware,
	authorizationMiddleware({ nivel_acesso: 2 }),
	UsuarioController.createEntity,
	() => {
		/* #swagger.tags = ['Usuario']*/
	}
);

router.put(
	'/usuario/:id',
	authenticationMiddleware,
	authorizationMiddleware({ nivel_acesso: 2 }),
	UsuarioController.updateEntity,
	() => {
		/* #swagger.tags = ['Usuario']*/
	}
);

router.post('/usuarioLogin', UsuarioController.login, () => {
	/* #swagger.tags = ['Usuario'] */
});

router.delete(
	'/usuario/:id',
	authenticationMiddleware,
	authorizationMiddleware({ nivel_acesso: 2 }),
	UsuarioController.deleteEntity,
	() => {
		/* #swagger.tags = ['Usuario']*/
	}
);

export default router;
