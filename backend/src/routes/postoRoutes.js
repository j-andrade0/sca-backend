import express from 'express';
import PostoController from '../controllers/postoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/posto', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), PostoController.getAllEntities, () => {
  /* #swagger.tags = ['Posto'] */
});

router.get('/posto/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), PostoController.getEntityById, () => {
  /* #swagger.tags = ['Posto'] */
});

router.post('/posto', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), PostoController.createEntity, () => {
  /* #swagger.tags = ['Posto'] */
});

router.put('/posto/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), PostoController.updateEntity, () => {
  /* #swagger.tags = ['Posto'] */
});

router.delete('/posto/:id', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), PostoController.deleteEntity, () => {
  /* #swagger.tags = ['Posto'] */
});

export default router;
