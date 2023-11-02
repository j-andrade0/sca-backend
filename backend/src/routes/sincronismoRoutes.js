import express from 'express';
import SincronismoController from '../controllers/sincronismoController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/sincronismo', authorizationMiddleware, SincronismoController.getAllEntities, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.get('/sincronismo/:id', authorizationMiddleware, SincronismoController.getEntityById, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.post('/sincronismo', authorizationMiddleware, SincronismoController.createEntity, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.put('/sincronismo/:id', authorizationMiddleware, SincronismoController.updateEntity, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.delete('/sincronismo/:id', authorizationMiddleware, SincronismoController.deleteEntity, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

export default router;
