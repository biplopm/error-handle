import mongoose from "mongoose";


//MongoDB Configuration
export const mongodbConnection = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URL)
      console.log(`MongoDB connection established`.bgYellow.black);
    } catch (error) {
      console.log(`MongoDB connection Error`.bgRed.black);
    }
  };


