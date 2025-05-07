import mongoose from "mongoose";

export const getConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`✅ MongoDB connected to: ${conn.connection.name}`);

    return conn;
  } catch (error) {
    console.error(`Failed to connect to MongoDB, error: ${error}`);
  }
};
