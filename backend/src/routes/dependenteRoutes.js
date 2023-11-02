import express from 'express';
import DependenteController from '../controllers/dependenteController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/dependente', authorizationMiddleware, DependenteController.getAllEntities, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.get('/dependente/:id', authorizationMiddleware, DependenteController.getEntityById, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.post('/dependente', authorizationMiddleware, DependenteController.createEntity, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.put('/dependente/:id', authorizationMiddleware, DependenteController.updateEntity, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.delete('/dependente/:id', authorizationMiddleware, DependenteController.deleteEntity, () => {
  /* #swagger.tags = ['Dependente'] */
});

export default router;
