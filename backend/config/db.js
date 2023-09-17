import mongoose from 'mongoose'

const connectDb = async () => {
  const mongoURI = process.env.MONGO_URI
  try {
    const conn = await mongoose.connect(mongoURI)
    console.log(`Conected to MongoDB on ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDb
