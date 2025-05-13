
import express from 'express'
import userRoutes from './routes/routes.js'

const app = express()

app.use(express.json())

app.use('/user', userRoutes)

export default app