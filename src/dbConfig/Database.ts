import mongoose from "mongoose";

export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MongoDb!);
    const connection = mongoose.connection;

    connection.on("connected", () =>
      console.log("MongoDb database connected successfully")
    );
    connection.on("error", () =>
      console.log("MongoDb database cannot be connected")
    );
  } catch (error) {
    console.log("Something went wrong. Cannot connect to database");
    console.log(error);
  }
}
