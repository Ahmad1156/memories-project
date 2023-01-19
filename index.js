import express from 'express';
import cors from 'cors';
import { connectDB } from './db/connectDB.js';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';



const app=express();
dotenv.config();

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb",extended:true}));
app.use(cors());

app.use('/posts',postRoutes)




const PORT=process.env.PORT || 5000;

const start=async ()=>{
    try {
      await connectDB(process.env.MONGO_URL);
      app.listen(PORT,console.log(`server is listening on port ${PORT}..
      `));
    } catch(error){
      console.log(error.message);
    }
}
start();