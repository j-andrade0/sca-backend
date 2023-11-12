import express from 'express';
import EfetivoController from '../controllers/efetivoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/efetivo', authenticationMiddleware, EfetivoController.getAllEntities, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.get('/efetivo/:id', authenticationMiddleware, EfetivoController.getEntityById, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.post('/efetivo', authenticationMiddleware, EfetivoController.createEntity, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.post('/efetivoLogin', EfetivoController.login, () => {
	/* #swagger.tags = ['Efetivo'] */
});

router.put('/efetivo/:id', authenticationMiddleware, EfetivoController.updateEntity, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.delete('/efetivo/:id', authenticationMiddleware, EfetivoController.deleteEntity, () => {
  /* #swagger.tags = ['Efetivo'] */
});

export default router;
