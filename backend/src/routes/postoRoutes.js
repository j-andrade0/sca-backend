import express from 'express';
import PostoController from '../controllers/postoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/posto', authenticationMiddleware, PostoController.getAllEntities, () => {
  /* #swagger.tags = ['Posto'] */
});

router.get('/posto/:id', authenticationMiddleware, PostoController.getEntityById, () => {
  /* #swagger.tags = ['Posto'] */
});

router.post('/posto', authenticationMiddleware, PostoController.createEntity, () => {
  /* #swagger.tags = ['Posto'] */
});

router.put('/posto/:id', authenticationMiddleware, PostoController.updateEntity, () => {
  /* #swagger.tags = ['Posto'] */
});

router.delete('/posto/:id', authenticationMiddleware, PostoController.deleteEntity, () => {
  /* #swagger.tags = ['Posto'] */
});

export default router;
