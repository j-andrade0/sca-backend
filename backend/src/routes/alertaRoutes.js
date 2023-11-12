import express from 'express';
import AlertaController from '../controllers/alertaController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/alerta', authenticationMiddleware, AlertaController.getAllEntities, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.get('/alerta/:id', authenticationMiddleware, AlertaController.getEntityById, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.post('/alerta', authenticationMiddleware, AlertaController.createEntity, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.put('/alerta/:id', authenticationMiddleware, AlertaController.updateEntity, () => {
  /* #swagger.tags = ['Alerta'] */
});

router.delete('/alerta/:id', authenticationMiddleware, AlertaController.deleteEntity, () => {
  /* #swagger.tags = ['Alerta'] */
});

export default router;
