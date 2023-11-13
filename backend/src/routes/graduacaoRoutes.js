import express from 'express';
import GraduacaoController from '../controllers/graduacaoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/graduacao', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), GraduacaoController.getAllEntities, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.get('/graduacao/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), GraduacaoController.getEntityById, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.post('/graduacao', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), GraduacaoController.createEntity, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.put('/graduacao/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), GraduacaoController.updateEntity, () => {
  /* #swagger.tags = ['Graduacao'] */
});

router.delete('/graduacao/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), GraduacaoController.deleteEntity, () => {
  /* #swagger.tags = ['Graduacao'] */
});

export default router;
