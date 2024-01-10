import express from 'express'
import { adminController } from '../controller/adminController.js'
import { Verify } from '../utils/varifyToken.js'
import {userController} from  '../controller/userController.js'

const router=express.Router()


router.post('/login',adminController.login)
router.get('/userList',Verify,userController.getUsers)
router.post('/updateUser',Verify,userController.changeStatus)
router.post('/editUser',Verify,userController.editUser)
router.post('/deleteUser',Verify,userController.deleteUser)

export default router