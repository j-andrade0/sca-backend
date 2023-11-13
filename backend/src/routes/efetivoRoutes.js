import express from 'express';
import EfetivoController from '../controllers/efetivoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'

const router = express.Router();

router.get('/efetivo', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), EfetivoController.getAllEntities, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.get('/efetivo/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), EfetivoController.getEntityById, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.post('/efetivo', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), EfetivoController.createEntity, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.post('/efetivoLogin', EfetivoController.login, () => {
	/* #swagger.tags = ['Efetivo'] */
});

router.put('/efetivo/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), EfetivoController.updateEntity, () => {
  /* #swagger.tags = ['Efetivo'] */
});

router.delete('/efetivo/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), EfetivoController.deleteEntity, () => {
  /* #swagger.tags = ['Efetivo'] */
});

export default router;
