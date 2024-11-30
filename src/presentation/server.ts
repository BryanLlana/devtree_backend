import express from 'express';
import colors from 'colors'

interface IPropsServer {
  port: number
}

export class Server {
  private readonly app = express()
  private readonly port: number
  private serverListener: any

  constructor(props: IPropsServer) {
    this.port = props.port
  }

  public start () {
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: true}))

    this.serverListener = this.app.listen(this.port, () => {
      console.log(colors.cyan(`Server running on port ${this.port}`));
    })
  }

  public close () {
    this.serverListener.close()
  }
}