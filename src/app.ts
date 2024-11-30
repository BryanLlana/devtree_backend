import { envs } from "./config/env"
import { Server } from "./presentation/server"

const main = async () => {
  const server = new Server({port: envs.PORT})
  server.start()
}

main()