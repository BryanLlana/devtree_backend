import mongoose from "mongoose"
import colors from 'colors';

interface IOptions {
  mongoUrl: string,
  dbName: string
}

export class MongoDatabase {
  public static async connect (options: IOptions) {
    try {
      const db = await mongoose.connect(options.mongoUrl, {
        dbName: options.dbName
      })

      console.log(colors.green(`Mongo connected: ${db.connection.host}:${db.connection.port}`));
    } catch (error) {
      console.log(colors.red('Mongo connection error'));
      throw error
    }
  }
}