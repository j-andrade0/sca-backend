import express from 'express';
import QRCodeController from '../controllers/qrcodeController.js';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/qrcode', authenticationMiddleware, QRCodeController.getAllEntities, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.get('/qrcode/:qrcode', authenticationMiddleware, QRCodeController.getEntityByQRCode, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.post('/qrcode', authenticationMiddleware, QRCodeController.createEntity, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.put('/qrcode/:qrcode', authenticationMiddleware, QRCodeController.updateEntity, () => {
  /* #swagger.tags = ['QRCode'] */
});

router.delete('/qrcode/:qrcode', authenticationMiddleware, QRCodeController.deleteEntity, () => {
  /* #swagger.tags = ['QRCode'] */
});

export default router;
