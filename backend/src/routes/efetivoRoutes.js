import express from 'express';
import EfetivoController from '../controllers/efetivoController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/efetivo', authorizationMiddleware, EfetivoController.getAllEntities, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.get('/efetivo/:id', authorizationMiddleware, EfetivoController.getEntityById, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.post('/efetivo', authorizationMiddleware, EfetivoController.createEntity, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.put('/efetivo/:id', authorizationMiddleware, EfetivoController.updateEntity, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.delete('/efetivo/:id', authorizationMiddleware, EfetivoController.deleteEntity, () => {
  /* #swagger.tags = ['Efetivo'] */
});

export default router;
