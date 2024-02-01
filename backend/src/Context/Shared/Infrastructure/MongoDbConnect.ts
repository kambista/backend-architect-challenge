import { MongoClient } from "mongodb";

export class MongoDbConnect {
	static async conectarBD() {
		const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
		console.log(url);
		const client = new MongoClient(url, {});
		try {
			await client.connect();
			console.log("Conexión exitosa a la base de datos");
			const db = client.db(process.env.DB_NAME);
			return db;
		} catch (err) {
      console.log(err);
			throw err;
		}
	}
}
