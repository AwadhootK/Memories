import React, { useEffect } from 'react'
import Post from './Post/Post'
import useStyles from './styles.js'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress, Grid } from '@material-ui/core'
import { fetchPosts } from '../../api/postsCRUD'

const Posts = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const posts = useSelector(state => state.posts.posts)
  const isLoading = useSelector(state => state.posts.isLoading)
  const error = useSelector(state => state.posts.error)

  if (isLoading) return <CircularProgress></CircularProgress>
  // if (error != null) return <h1>An error occurred! {error}</h1>

  return (
    <Grid
      className={classes.mainContainer}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map(post => (
        <Grid item key={post._id} xs={12} sm={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Posts
