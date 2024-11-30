import { envs } from "./config/env"
import { MongoDatabase } from "./data/mongo/mongo.database"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

const main = async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.DB_NAME
  })
  const server = new Server({port: envs.PORT, routes: AppRoutes.getRoutes()})
  server.start()
}

main()