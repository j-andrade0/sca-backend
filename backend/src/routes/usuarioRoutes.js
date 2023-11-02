import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'

const router = express.Router();

router.get('/usuario', authorizationMiddleware, UsuarioController.getAllEntities, () => {
	/* #swagger.tags = ['User']*/
});

router.get('/usuario/:id', authorizationMiddleware, UsuarioController.getEntityById, () => {
	/* #swagger.tags = ['User']*/
});

router.post('/usuario', UsuarioController.createEntity, () => {
	/* #swagger.tags = ['User']*/
});

router.patch('/usuario/:id', UsuarioController.updateEntity, () => {
	/* #swagger.tags = ['User']*/
})

router.post('/usuarioLogin', UsuarioController.login, () => {
	/* #swagger.tags = ['User'] */
});

router.delete('/usuario/:id', authorizationMiddleware, UsuarioController.deleteEntity, () => {
/* #swagger.tags = ['User']*/
});

export default router;
