import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();

router.post('/',authMiddleware,createPost) 
router.get('/',getAllPosts)
router.get('/:id',getPostById)
router.put('/:id',authMiddleware,updatePost)
router.delete('/:id',authMiddleware,deletePost)

export default router; 