// routes/helperRoutes.ts
import express from 'express';
import { HelperController } from '../controllers/helperController';
import multer from 'multer';
import path from 'path';
import { FileController } from '../controllers/fileController';
import { validateHelper } from '../middlewares/errorHandler';


const router = express.Router();
const upload = multer({ dest: path.join(__dirname, '../uploads') });
const helperController = new HelperController();
const fileController = new FileController();

router.get('/helpers', helperController.getHelpers);
router.post('/helpers',validateHelper,helperController.addHelper);
router.get('/helpers/:id', helperController.getHelperById);
router.delete('/helpers/:id', helperController.deleteHelper); 
router.put('/helpers/:id',helperController.updateHelper)

router.post('/upload',upload.single('file'),fileController.uploadFile);


export default router;
