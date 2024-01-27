import mongoose from 'mongoose';
import mangoose, { connection } from 'mongoose'

export async function connect(){
    try {
        mangoose.connect(process.env.MONGO_URI!);
       const connection = mongoose.connection;

       connection.on('connected',()=>{
        console.log('MongoDB connected Successfuly');
       })

       connection.on('error',(err)=>{
        console.log('MongoDB connection error Please make sure MongoDb is Running', err)
        process.exit()
       })

    } catch (error) {
        console.log("something went wrong",error)
    }
}