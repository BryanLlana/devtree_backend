import {get} from 'env-var'
import 'dotenv/config'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  FRONTEND_URL: get('FRONTEND_URL').required().asString(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  DB_NAME: get('DB_NAME').required().asString()
}