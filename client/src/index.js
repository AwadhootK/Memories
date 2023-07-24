import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import postReducers from './reducers/postsReducer.js'
import App from './App.js'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    posts: postReducers
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
