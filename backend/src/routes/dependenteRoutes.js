import express from 'express';
import DependenteController from '../controllers/dependenteController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/dependente', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), DependenteController.getAllEntities, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.get('/dependente/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), DependenteController.getEntityById, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.post('/dependente', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), DependenteController.createEntity, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.put('/dependente/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), DependenteController.updateEntity, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.delete('/dependente/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), DependenteController.deleteEntity, () => {
  /* #swagger.tags = ['Dependente'] */
});

export default router;
