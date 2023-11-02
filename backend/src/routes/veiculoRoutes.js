import express from 'express';
import VeiculoController from '../controllers/veiculoController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/veiculo', authorizationMiddleware, VeiculoController.getAllEntities, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.get('/veiculo/:id', authorizationMiddleware, VeiculoController.getEntityById, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.post('/veiculo', authorizationMiddleware, VeiculoController.createEntity, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.put('/veiculo/:id', authorizationMiddleware, VeiculoController.updateEntity, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.delete('/veiculo/:id', authorizationMiddleware, VeiculoController.deleteEntity, () => {
  /* #swagger.tags = ['Veiculo'] */
});

export default router;
