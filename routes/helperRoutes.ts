// routes/helperRoutes.ts
import express from 'express';
import { getHelpers , addHelper , getHelperById , deleteHelper , uploadFileToCloudinary, updateHelper} from '../controllers/helperController';
import multer from 'multer';
import path from 'path';


const router = express.Router();
const upload = multer({ dest: path.join(__dirname, '../uploads') });

router.get('/helpers', getHelpers);
router.post('/helpers',addHelper);
router.get('/helpers/:id', getHelperById);
router.delete('/helpers/:id', deleteHelper); 
router.post('/upload',upload.single('file'),uploadFileToCloudinary);
router.put('/helpers/:id',updateHelper)

export default router;
