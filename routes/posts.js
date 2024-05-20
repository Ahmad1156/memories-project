import express from 'express';
import auth from '../middleware/auth.js';
import { getPosts,getPostsBySearch,createPost,updatePost,deletePost,likePost,getPost,commentPost } from '../controllers/posts.js';

const router=express.Router();

router.route('/')
       .get(getPosts)
       .post(auth,createPost);

router.get('/search',getPostsBySearch);
router.route('/:id').patch(auth,updatePost).delete(auth,deletePost).get(getPost);

router.patch('/:id/likePost',auth,likePost);
router.post('/:id/commentPost',auth,commentPost);

export default router;