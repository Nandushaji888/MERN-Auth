import express from 'express' 
import {userController} from '../controller/userController.js'; 
import { Verify } from '../utils/varifyToken.js'; 
import upload from '../middleware/multer.js'; 

const router = express.Router(); 

router.post('/register',userController.register) 
router.post('/login',userController.login) 
router.post('/uploadImage',Verify,upload.single('image'),userController.updateUser) 

export default router  