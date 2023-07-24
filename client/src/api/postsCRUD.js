import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:3000/posts'

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
  const response = await axios.get(url)
  return response.data
})
export const createPost = createAsyncThunk('createPost', async post => {
  const response = await axios.post(url, post)
  return response.data
})
export const deletePost = createAsyncThunk('deletePost', async id => {
  console.log('id: ' + id)
  const response = await axios.delete(`${url}/${id}`)
  return response.data
})
export const incrementLikeCount = createAsyncThunk(
  'incrementLikeCount',
  async ({ id, likes }) => {
    console.log('id: ' + id)
    console.log('likes: ' + likes)
    const response = await axios.patch(`${url}/${id}/?likes=${parseInt(likes)}`)
    return response.data
  }
)
