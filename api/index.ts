import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { v1Router } from '../routes'
import bodyParser from 'body-parser'
import AppConfig from '../config'

dotenv.config()

const app = express()

const corsOptions = {
  // TODO: Only allow all origins when running locally but restrict in production
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: AppConfig.BODY_PARSER_LIMIT }))

app.use('/api/v1', v1Router)

export default app
