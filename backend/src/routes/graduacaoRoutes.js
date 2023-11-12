import express from 'express';
import GraduacaoController from '../controllers/graduacaoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/graduacao', authenticationMiddleware, GraduacaoController.getAllEntities, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.get('/graduacao/:id', authenticationMiddleware, GraduacaoController.getEntityById, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.post('/graduacao', authenticationMiddleware, GraduacaoController.createEntity, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.put('/graduacao/:id', authenticationMiddleware, GraduacaoController.updateEntity, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.delete('/graduacao/:id', authenticationMiddleware, GraduacaoController.deleteEntity, () => {
  /* #swagger.tags = ['Graduacao'] */
});

export default router;
