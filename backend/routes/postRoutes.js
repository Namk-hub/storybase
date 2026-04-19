import route from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=route.Router();

router.post('/posts',authMiddleware,createPost) 
router.get('/posts',getAllPosts)
router.get('/posts/:id',getPostById)
router.put('/posts/:id',authMiddleware,updatePost)
router.delete('/posts/:id',authMiddleware,deletePost)

export default router; 