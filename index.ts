import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app:Express = express();
const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Hello Backend')
})

app.get('/demo',(req,res)=>{
    res.send('Hello Demo')
})

app.get('/json',(req,res)=>{
    res.json({name:'rakib',age:27,gender:'male'})
})

app.listen(port,()=>{
    console.log(`listening the app from port:${port}`)
})
