import express from 'express';
import AlertaController from '../controllers/alertaController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/alerta', authorizationMiddleware, AlertaController.getAllEntities, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.get('/alerta/:id', authorizationMiddleware, AlertaController.getEntityById, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.post('/alerta', authorizationMiddleware, AlertaController.createEntity, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.put('/alerta/:id', authorizationMiddleware, AlertaController.updateEntity, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.delete('/alerta/:id', authorizationMiddleware, AlertaController.deleteEntity, () => {
  /* #swagger.tags = ['Alerta'] */
});

export default router;
