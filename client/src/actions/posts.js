import * as api from '../api'

// Action Creators
export const getPosts = () => async dispatch => {
  try {
    const { data } = await api.fetchPosts()
    dispatch({ type: 'FETCH_ALL', payload: data }) // dispatch an action
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post) => async dispatch => {
  try {
    const { data } = await api.createPost(post)
    dispatch({ type: 'CREATE', data: data })
  } catch (error) {
    console.log(error)
  }
}
