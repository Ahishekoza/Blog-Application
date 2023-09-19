import express from 'express';
const app = express();
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import morgan from 'morgan';
import UserRouter from './router/UserRouter.js'
import cors from 'cors'

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected To DB Successfully");
}).catch((err)=>{
    console.log(err.message);
})
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('./uploads'));

app.use('/api/user',UserRouter)



app.listen(8080,()=>{
    console.log('listening on port 8080');
})