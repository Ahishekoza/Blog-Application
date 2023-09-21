import express from "express";
import { verfiyToken } from "../verifyToken.js";
import { upload } from "../fileUpload.js";
import { editBlogPost, getBlogById, postBlog } from "../controller/PostController.js";
const router = express.Router()

// POST REQUEST
router.post('/',verfiyToken,upload.single('blogPost'),postBlog)
// PUT REQUEST
router.put('/update/:id',verfiyToken,upload.single('blogPost'),editBlogPost),
// GET REQUEST
router.get('/:id',verfiyToken,getBlogById)

export default router