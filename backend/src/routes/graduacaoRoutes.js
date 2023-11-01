import express from 'express';
import GraduacaoController from '../controllers/graduacaoController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/graduacao', authorizationMiddleware, GraduacaoController.getAllEntities, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.get('/graduacao/:id', authorizationMiddleware, GraduacaoController.getEntityById, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.post('/graduacao', authorizationMiddleware, GraduacaoController.createEntity, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.put('/graduacao/:id', authorizationMiddleware, GraduacaoController.updateEntity, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.delete('/graduacao/:id', authorizationMiddleware, GraduacaoController.deleteEntity, () => {
  /* #swagger.tags = ['Graduacao'] */
});

export default router;
