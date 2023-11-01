import express from 'express';
import QRCodeController from '../controllers/qrcodeController.js';
import authorizationMiddleware from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/qrcode', authorizationMiddleware, QRCodeController.getAllEntities, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.get('/qrcode/:qrcode', authorizationMiddleware, QRCodeController.getEntityByQRCode, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.post('/qrcode', authorizationMiddleware, QRCodeController.createEntity, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.put('/qrcode/:qrcode', authorizationMiddleware, QRCodeController.updateEntity, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.delete('/qrcode/:qrcode', authorizationMiddleware, QRCodeController.deleteEntity, () => {
  /* #swagger.tags = ['QRCode'] */
});

export default router;
