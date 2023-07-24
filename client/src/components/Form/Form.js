import React, { useEffect, useState } from 'react'
import useStyles from './styles.js'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, fetchPosts, updatePost } from '../../api/postsCRUD.js'

const Form = () => {
  const initialData = {
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  }

  const classes = useStyles()

  const dispatch = useDispatch()
  const currentId = useSelector(state => state.id.id)
  const currentTitle = useSelector(state => state.id.title)
  const [postData, setPostData] = useState(initialData)

  const handleOnSubmit = e => {
    e.preventDefault()
    if (currentId == null) {
      // dispatch for creating a new post
      dispatch(createPost(postData))
    } else {
      // dispatch for editing existing post
      let tempData = {}
      for (const key in postData) {
        if (postData[key] !== '') tempData[key] = postData[key]
      }
      console.log('newpost data: ' + tempData)
      dispatch(updatePost({ id: currentId, newPost: tempData }))
      clear()
    }
    clear()
  }
  const clear = () => {
    setPostData(initialData)
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleOnSubmit}
      >
        <Typography variant='h6'>
          {currentId == null
            ? 'Creating a memory'
            : `Editing Post: ${currentTitle}`}
        </Typography>
        <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator}
          onChange={e => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={e => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={e => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={e =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={base64String => {
              console.log('before: '+postData['selectedFile'])
              console.log('after: '+base64String)
              setPostData({ ...postData, selectedFile: base64String })
            }}
          ></FileBase>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
