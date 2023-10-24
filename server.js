import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import {connectDB} from './config/db.js';
import testRoute from './routes/testRoute.js';
import userRoute from './routes/userRoute.js';
import { CronJob } from 'cron';
import {notificationWorker} from './utils/notificationWorker.js';

//dot config
dotenv.config();

//mongodb connection 
connectDB();

//rest object 
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1/test', testRoute);
app.use('/api/v1/patient', userRoute);



//port 
const PORT = process.env.PORT || 8000;
app.listen(PORT , () => {
    console.log(`The Server is Running in ${process.env.DEV_MODE} on Port ${PORT}`.bgGreen.white);
});

const job = new CronJob('54 14 * * *',() => {
    notificationWorker();
},
null, true,'Asia/Kolkata')