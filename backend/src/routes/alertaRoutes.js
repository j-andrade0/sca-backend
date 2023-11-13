import express from 'express';
import AlertaController from '../controllers/alertaController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js'

const router = express.Router();

router.get('/alerta', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), AlertaController.getAllEntities, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.get('/alerta/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), AlertaController.getEntityById, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.post('/alerta', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), AlertaController.createEntity, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.put('/alerta/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), AlertaController.updateEntity, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.delete('/alerta/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), AlertaController.deleteEntity, () => {
  /* #swagger.tags = ['Alerta'] */
});

export default router;
