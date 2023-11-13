import express from 'express';
import VeiculoController from '../controllers/veiculoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/veiculo', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}),  VeiculoController.getAllEntities, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.get('/veiculo/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}),  VeiculoController.getEntityById, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.post('/veiculo', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}),  VeiculoController.createEntity, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.put('/veiculo/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}),  VeiculoController.updateEntity, () => {
  /* #swagger.tags = ['Veiculo'] */
});

router.delete('/veiculo/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}),  VeiculoController.deleteEntity, () => {
  /* #swagger.tags = ['Veiculo'] */
});

export default router;
