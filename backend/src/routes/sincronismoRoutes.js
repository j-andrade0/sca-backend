import express from 'express';
import SincronismoController from '../controllers/sincronismoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/sincronismo', authenticationMiddleware, SincronismoController.getAllEntities, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.get('/sincronismo/:id', authenticationMiddleware, SincronismoController.getEntityById, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.post('/sincronismo', authenticationMiddleware, SincronismoController.createEntity, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.put('/sincronismo/:id', authenticationMiddleware, SincronismoController.updateEntity, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.delete('/sincronismo/:id', authenticationMiddleware, SincronismoController.deleteEntity, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

export default router;
