require('dotenv').config()
const express = require('express');

const app = express();
const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Hello Backend')
})

app.get('/demo',(req,res)=>{
    res.send('Hello Demo')
})
app.listen(port,()=>{
    console.log(`listening the app from port:${port}`)
})
