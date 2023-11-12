import express from 'express';
import UnidadeController from '../controllers/unidadeController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/unidade', authenticationMiddleware, UnidadeController.getAllEntities, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.get('/unidade/:id', authenticationMiddleware, UnidadeController.getEntityById, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.post('/unidade', authenticationMiddleware, UnidadeController.createEntity, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.put('/unidade/:id', authenticationMiddleware, UnidadeController.updateEntity, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.delete('/unidade/:id', authenticationMiddleware, UnidadeController.deleteEntity, () => {
  /* #swagger.tags = ['Unidade'] */
});

export default router;
