import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createPost = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage({ ...post })
  try {
    await newPost.save()
    console.log('added to db!')
    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const deletePost = async (req, res) => {
  const id = req.params.id
  try {
    await PostMessage.deleteOne({ _id: id })
    console.log('deleted from db')
    res.status(201).json(id)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const incrementLikeCount = async (req, res) => {
  const id = req.params.id
  const likes = req.query.likes
  try {
    console.log(id)
    console.log(likes)
    await PostMessage.updateOne({ _id: id }, { likeCount: parseInt(likes) + 1 })
    console.log('updated likes')
    res.status(201).json({ id: id, likes: parseInt(likes) + 1 })
  } catch (error) {
    console.log(error)
    res.status(409).json({ message: error.message, likes: likes })
  }
}

export const updatePost = async (req, res) => {
  const body = req.body
  const id = req.params.id
  try {
    const response = await PostMessage.findOneAndUpdate({ _id: id }, body)
    console.log('post updated!')
    res.status(201).json({ id: id, newPost: body })
  } catch (error) {
    res.status(409).json({ message: error.message, id: id })
  }
}
