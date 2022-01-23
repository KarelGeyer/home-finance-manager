import mongoose from 'mongoose';

const MongoDb = process.env.MONGO_URI

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(MongoDb)
    console.log('db success connect')
  } catch (err) {
    console.log('error connecting to database')
    console.log(err)
    process.exit(1)
  }
}


export default connectDb;