import express from "express";
const router = express.Router();
import multer from 'multer'
import { register, getUserById, updateUser, login, getAllUsers,  } from "../controller/UserController.js";
import { verfiyToken } from "../verifyToken.js";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage});

// POST REQUEST
router.post('/register',register)
router.post('/login',login)
// PUT REQUEST
router.put('/update/:id',verfiyToken,upload.single('profilePic'),updateUser)
// GET REQUEST
router.get('/:id',verfiyToken,getUserById)
router.get('/',verfiyToken,getAllUsers)
export default router 