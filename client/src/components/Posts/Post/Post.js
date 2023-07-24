import React from 'react'
import useStyles from './styles.js'
import { useDispatch } from 'react-redux'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core'
import moment from 'moment'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt.js'
import DeleteIcon from '@material-ui/icons/Delete.js'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz.js'
import {
  deletePost,
  fetchPosts,
  incrementLikeCount
} from '../../../api/postsCRUD.js'

const Post = ({ post }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.creator}</Typography>
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size='small' onClick={() => {}}>
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {post.tags.map(tag => `#${tag}`)}
        </Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant='h10' gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            // update like count
            let n = post.likeCount ? post.likeCount : 0
            dispatch(incrementLikeCount({ id: post._id, likes: n }))
          }}
        >
          <ThumbUpAltIcon />
          Like {post.likeCount}
        </Button>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            // delete the post
            dispatch(deletePost(post._id))
          }}
        >
          <DeleteIcon />
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post
