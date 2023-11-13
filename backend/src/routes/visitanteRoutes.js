import express from 'express';
import VisitanteController from '../controllers/visitanteController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/visitante', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), VisitanteController.getAllEntities, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.get('/visitante/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), VisitanteController.getEntityById, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.post('/visitante', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), VisitanteController.createEntity, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.post('/visitanteLogin', VisitanteController.login, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.put('/visitante/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), VisitanteController.updateEntity, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.delete('/visitante/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), VisitanteController.deleteEntity, () => {
	/* #swagger.tags = ['Visitante'] */
});

export default router;
