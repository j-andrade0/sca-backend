import express from 'express';
import SincronismoController from '../controllers/sincronismoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/sincronismo', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), SincronismoController.getAllEntities, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.get('/sincronismo/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), SincronismoController.getEntityById, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.post('/sincronismo', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), SincronismoController.createEntity, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.put('/sincronismo/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), SincronismoController.updateEntity, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

router.delete('/sincronismo/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), SincronismoController.deleteEntity, () => {
  /* #swagger.tags = ['Sincronismo'] */
});

export default router;
