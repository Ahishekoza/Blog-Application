import express from "express";
import { createCategory, getAllCategories } from "../controller/CategoryController.js";
const router = express.Router()

// POST REQUEST
router.post('/',createCategory)
// GET REQUEST
router.get('/',getAllCategories)

export default router