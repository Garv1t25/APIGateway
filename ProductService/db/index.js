import mongoose from "mongoose";



const connectDb = async () => {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`)
    console.log(`
    Connected to MongoDB.
    Host: ${connectionInstance.connection.host}
    Name: ${connectionInstance.connection.name}
    Port: ${connectionInstance.connection.port}
    `);
}

export default connectDb;