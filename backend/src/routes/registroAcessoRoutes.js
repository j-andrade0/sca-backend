import express from 'express';
import RegistroAcessoController from '../controllers/registroAcessoController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/registro_acesso', authorizationMiddleware, RegistroAcessoController.getAllEntities, () => {
  /* #swagger.tags = ['RegistroAcesso'] */
});

router.get('/registro_acesso/:id', authorizationMiddleware, RegistroAcessoController.getEntityById, () => {
  /* #swagger.tags = ['RegistroAcesso'] */
});

router.post('/registro_acesso', authorizationMiddleware, RegistroAcessoController.createEntity, () => {
  /* #swagger.tags = ['RegistroAcesso'] */
});

router.put('/registro_acesso/:id', authorizationMiddleware, RegistroAcessoController.updateEntity, () => {
  /* #swagger.tags = ['RegistroAcesso'] */
});

router.delete('/registro_acesso/:id', authorizationMiddleware, RegistroAcessoController.deleteEntity, () => {
  /* #swagger.tags = ['RegistroAcesso'] */
});

export default router;
