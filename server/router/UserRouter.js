import express from "express";
const router = express.Router();
import { register, getUserById, updateUser, login, getAllUsers,  } from "../controller/UserController.js";
import { verfiyToken } from "../verifyToken.js";
import { upload } from "../fileUpload.js";



// POST REQUEST
router.post('/register',register)
router.post('/login',login)
// PUT REQUEST
router.put('/update/:id',verfiyToken,upload.single('profilePic'),updateUser)
// GET REQUEST
router.get('/:id',verfiyToken,getUserById)
router.get('/',verfiyToken,getAllUsers)
export default router 