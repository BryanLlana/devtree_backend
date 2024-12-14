import cors, {CorsOptions} from 'cors'
import { envs } from '../env'

export class CorsAdapter {
  private static readonly options: CorsOptions = {
    origin: (requestOrigin, callback) => {
      if ([envs.FRONTEND_URL, undefined].includes(requestOrigin)) {
        callback(null, true)
      } else {
        callback(new Error('Error de cors'))
      }
    },
  }

  public static create() {
    return () => cors(this.options)
  }
}