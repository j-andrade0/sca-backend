import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/usuario', authenticationMiddleware, UsuarioController.getAllEntities, () => {
	/* #swagger.tags = ['Usuario']*/
});

router.get('/usuario/:id', authenticationMiddleware, UsuarioController.getEntityById, () => {
	/* #swagger.tags = ['Usuario']*/
});

router.post('/usuario', authenticationMiddleware, UsuarioController.createEntity, () => {
	/* #swagger.tags = ['Usuario']*/
});

router.put('/usuario/:id', authenticationMiddleware, UsuarioController.updateEntity, () => {
	/* #swagger.tags = ['Usuario']*/
});

router.post('/usuarioLogin', UsuarioController.login, () => {
	/* #swagger.tags = ['Usuario'] */
});

router.delete('/usuario/:id', authenticationMiddleware, UsuarioController.deleteEntity, () => {
	/* #swagger.tags = ['Usuario']*/
});

export default router;
