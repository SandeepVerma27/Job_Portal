import mongoose from "mongoose";
import colors from "colors";



const  connectDB=async()=>{ 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
        
    } catch (error) {
        console.log(error,"Database Connections Errors !".red)
    }

}

export default connectDB;

