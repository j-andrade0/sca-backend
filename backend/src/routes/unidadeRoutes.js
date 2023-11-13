import express from 'express';
import UnidadeController from '../controllers/unidadeController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/unidade', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), UnidadeController.getAllEntities, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.get('/unidade/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), UnidadeController.getEntityById, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.post('/unidade', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), UnidadeController.createEntity, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.put('/unidade/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), UnidadeController.updateEntity, () => {
  /* #swagger.tags = ['Unidade'] */
});

router.delete('/unidade/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), UnidadeController.deleteEntity, () => {
  /* #swagger.tags = ['Unidade'] */
});

export default router;
