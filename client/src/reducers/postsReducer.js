import { createSlice } from '@reduxjs/toolkit'
import {
  fetchPosts,
  createPost,
  deletePost,
  incrementLikeCount,
  updatePost
} from '../api/postsCRUD'

const initialState = {
  isLoading: false,
  posts: [],
  error: ''
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false
      state.posts = action.payload
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    builder.addCase(createPost.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false
      state.posts = [...state.posts, action.payload]
    })
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    builder.addCase(deletePost.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(post => post._id !== action.payload)
      state.isLoading = false
    })
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    builder.addCase(incrementLikeCount.pending, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(incrementLikeCount.fulfilled, (state, action) => {
      const { id, likes } = action.payload
      state.posts = state.posts.map(post =>
        post._id === id ? { ...post, likeCount: likes } : post
      )
      state.isLoading = false
    })
    builder.addCase(incrementLikeCount.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    builder.addCase(updatePost.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const { id, newPost } = action.payload
      console.log('id: ' + id)
      console.log('updated post: ' + JSON.stringify(newPost))
      state.posts = state.posts.map(post =>
        post._id === id ? { ...post, ...newPost } : post
      )

      state.isLoading = false
    })
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  }
})

export default postSlice.reducer
