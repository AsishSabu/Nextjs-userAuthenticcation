import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connection", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (error) => {
      console.log("Error in MongoDB connection", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Error in mongo connection", error);
  }
}
