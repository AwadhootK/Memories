import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRouter from './routes/posts.js'

const app = express()


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRouter)

const CONNECTION_URL =
  'mongodb+srv://awadhootk6:jnpppllfb83@cluster0.rxf3cul.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(e => console.log(e))
