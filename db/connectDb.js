import mongoose from 'mongoose';

const MongoDb = process.env.MONGO_URI

const connectDb = async () => {
  try {
    await mongoose.connect(MongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('db success connect')
  } catch (err) {
    console.log('error connecting to database')
    console.log(err)
    process.exit(1)
  }
}


export default connectDb;