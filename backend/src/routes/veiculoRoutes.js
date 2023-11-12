import express from 'express';
import VeiculoController from '../controllers/veiculoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/veiculo', authenticationMiddleware, VeiculoController.getAllEntities, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.get('/veiculo/:id', authenticationMiddleware, VeiculoController.getEntityById, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.post('/veiculo', authenticationMiddleware, VeiculoController.createEntity, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.put('/veiculo/:id', authenticationMiddleware, VeiculoController.updateEntity, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.delete('/veiculo/:id', authenticationMiddleware, VeiculoController.deleteEntity, () => {
  /* #swagger.tags = ['Veiculo'] */
});

export default router;
