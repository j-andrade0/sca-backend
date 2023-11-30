import express from 'express';
import CartaoVacinaController from '../controllers/cartaoVacinaController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/cartoesvacina', authenticationMiddleware, authorizationMiddleware({ nivel_acesso: 2 }), CartaoVacinaController.getAllEntities, () => {
  /* #swagger.tags = ['CartaoVacina'] */
});

router.get('/cartoesvacina/:id', authenticationMiddleware, authorizationMiddleware({ nivel_acesso: 2 }), CartaoVacinaController.getEntityById, () => {
  /* #swagger.tags = ['CartaoVacina'] */
});

router.post('/cartoesvacina', authenticationMiddleware, authorizationMiddleware({ nivel_acesso: 2 }), CartaoVacinaController.createEntity, () => {
  /* #swagger.tags = ['CartaoVacina'] */
});

router.put('/cartoesvacina/:id', authenticationMiddleware, authorizationMiddleware({ nivel_acesso: 2 }), CartaoVacinaController.updateEntity, () => {
  /* #swagger.tags = ['CartaoVacina'] */
});

router.delete('/cartoesvacina/:id', authenticationMiddleware, authorizationMiddleware({ nivel_acesso: 2 }), CartaoVacinaController.deleteEntity, () => {
  /* #swagger.tags = ['CartaoVacina'] */
});

export default router;
