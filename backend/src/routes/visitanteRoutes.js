import express from 'express';
import VisitanteController from '../controllers/visitanteController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/visitante', authorizationMiddleware, VisitanteController.getAllEntities, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.get('/visitante/:id', authorizationMiddleware, VisitanteController.getEntityById, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.post('/visitante', authorizationMiddleware, VisitanteController.createEntity, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.post('/visitanteLogin', VisitanteController.login, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.put('/visitante/:id', authorizationMiddleware, VisitanteController.updateEntity, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.delete('/visitante/:id', authorizationMiddleware, VisitanteController.deleteEntity, () => {
	/* #swagger.tags = ['Visitante'] */
});

export default router;
