import express from 'express';
import QRCodeController from '../controllers/qrcodeController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/qrcode', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), QRCodeController.getAllEntities, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.get('/qrcode/:qrcode', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), QRCodeController.getEntityByQRCode, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.post('/qrcode', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), QRCodeController.createEntity, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.put('/qrcode/:qrcode', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), QRCodeController.updateEntity, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.delete('/qrcode/:qrcode', authenticationMiddleware, authorizationMiddleware({nivel_acesso: 2}), QRCodeController.deleteEntity, () => {
  /* #swagger.tags = ['QRCode'] */
});

export default router;
