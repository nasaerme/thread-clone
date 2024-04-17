import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoute.js'
import messageRoutes from './routes/messageRoutes.js'
import {v2 as cloudinary} from 'cloudinary';
import {app,server} from './socket/socket.js'


//10:49:10 video
dotenv.config()
connectDB()


const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

//Middlewares
app.use(express.json({limit:"50mb"})) // To parse JSON data in the req.body
app.use(express.urlencoded({extended:true})) // even if the req body nested object able to parsed without any problem
app.use(cookieParser()) // Allow us to get the request and send the cookie response

//Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/messages", messageRoutes)



server.listen(PORT, ()=>{
  console.log(`Sever started at http://localhost:${PORT}`)
})