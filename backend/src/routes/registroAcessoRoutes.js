import express from 'express';
import RegistroAcessoController from '../controllers/registroAcessoController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/registro_acesso', authenticationMiddleware, RegistroAcessoController.getAllEntities, () => {
  /* #swagger.tags = ['RegistroAcesso'] */
});

router.get('/registro_acesso/:id', authenticationMiddleware, RegistroAcessoController.getEntityById, () => {
  /* #swagger.tags = ['RegistroAcesso'] */
});

router.post('/registro_acesso', authenticationMiddleware, RegistroAcessoController.createEntity, () => {
  /* #swagger.tags = ['RegistroAcesso'] */
});

router.put('/registro_acesso/:id', authenticationMiddleware, RegistroAcessoController.updateEntity, () => {
  /* #swagger.tags = ['RegistroAcesso'] */
});

router.delete('/registro_acesso/:id', authenticationMiddleware, RegistroAcessoController.deleteEntity, () => {
  /* #swagger.tags = ['RegistroAcesso'] */
});

export default router;
