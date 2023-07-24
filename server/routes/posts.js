import express from 'express'
import {
  getPosts,
  createPost,
  deletePost,
  incrementLikeCount,
  updatePost
} from '../controllers/posts.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)
router.delete('/:id', deletePost)
router.patch('/likes/:id', incrementLikeCount)
router.patch('/:id', updatePost)

export default router
