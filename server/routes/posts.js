import express from 'express'
import { getPosts, createPost, deletePost, incrementLikeCount } from '../controllers/posts.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)
router.delete('/:id', deletePost)
router.patch('/:id', incrementLikeCount)

export default router