import express from 'express';
import VisitanteController from '../controllers/visitanteController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/visitante', authenticationMiddleware, VisitanteController.getAllEntities, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.get('/visitante/:id', authenticationMiddleware, VisitanteController.getEntityById, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.post('/visitante', authenticationMiddleware, VisitanteController.createEntity, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.post('/visitanteLogin', VisitanteController.login, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.put('/visitante/:id', authenticationMiddleware, VisitanteController.updateEntity, () => {
	/* #swagger.tags = ['Visitante'] */
});

router.delete('/visitante/:id', authenticationMiddleware, VisitanteController.deleteEntity, () => {
	/* #swagger.tags = ['Visitante'] */
});

export default router;
