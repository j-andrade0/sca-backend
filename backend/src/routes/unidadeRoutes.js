import express from 'express';
import UnidadeController from '../controllers/unidadeController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/unidade', authorizationMiddleware, UnidadeController.getAllEntities, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.get('/unidade/:id', authorizationMiddleware, UnidadeController.getEntityById, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.post('/unidade', authorizationMiddleware, UnidadeController.createEntity, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.put('/unidade/:id', authorizationMiddleware, UnidadeController.updateEntity, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.delete('/unidade/:id', authorizationMiddleware, UnidadeController.deleteEntity, () => {
  /* #swagger.tags = ['Unidade'] */
});

export default router;
