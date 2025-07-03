import { dbName } from "@/constants/dbName";
import mongoose from "mongoose";
async function connectDb() {
	try {
		if (process.env.MONGODB_URI) {
			const connectionInstance = await mongoose.connect(
				`${process.env.MONGODB_URI}/${dbName}`
			);

			connectionInstance.connection.on("error", (error) => {
				console.log(`Error connecting to MongoDB: ${error.message}`);
				process.exit(1);
			});

			connectionInstance.connection.on("connected", () => {
				console.log(
					`Connected to MongoDB at ${connectionInstance.connection.host}:${connectionInstance.connection.port}`
				);
			});
		} else {
			throw new Error(
				"MONGODB_URL is not defined in environment variables."
			);
		}
	} catch (error) {
		console.log("connection error while connecting to DB.", error);
	}
}
export default connectDb;
