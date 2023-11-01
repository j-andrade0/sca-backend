import express from 'express';
import PostoController from '../controllers/postoController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/posto', authorizationMiddleware, PostoController.getAllEntities, () => {
  /* #swagger.tags = ['Posto'] */
});

router.get('/posto/:id', authorizationMiddleware, PostoController.getEntityById, () => {
  /* #swagger.tags = ['Posto'] */
});

router.post('/posto', authorizationMiddleware, PostoController.createEntity, () => {
  /* #swagger.tags = ['Posto'] */
});

router.put('/posto/:id', authorizationMiddleware, PostoController.updateEntity, () => {
  /* #swagger.tags = ['Posto'] */
});

router.delete('/posto/:id', authorizationMiddleware, PostoController.deleteEntity, () => {
  /* #swagger.tags = ['Posto'] */
});

export default router;
