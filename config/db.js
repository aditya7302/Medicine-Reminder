import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgBlue.white);
    }catch(error){
        console.log(`MongoDB Database error ${error}`.bgRed.white);
    }
}
