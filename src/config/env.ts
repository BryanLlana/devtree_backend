import {get} from 'env-var'
import 'dotenv/config'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  FRONTEND_URL: get('FRONTEND_URL').required().asString()
}