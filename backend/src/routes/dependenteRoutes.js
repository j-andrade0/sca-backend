import express from 'express';
import DependenteController from '../controllers/dependenteController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/dependente', authenticationMiddleware, DependenteController.getAllEntities, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.get('/dependente/:id', authenticationMiddleware, DependenteController.getEntityById, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.post('/dependente', authenticationMiddleware, DependenteController.createEntity, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.put('/dependente/:id', authenticationMiddleware, DependenteController.updateEntity, () => {
  /* #swagger.tags = ['Dependente'] */
});

router.delete('/dependente/:id', authenticationMiddleware, DependenteController.deleteEntity, () => {
  /* #swagger.tags = ['Dependente'] */
});

export default router;
