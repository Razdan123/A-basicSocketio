const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors: { origin: '*'}});

app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/home',(req,res)=>{
    res.render('home');
})

app.get('/display',(req,res)=>{
    res.render('display');
})

server.listen(3001,()=>{
    console.log(`Listening at port number ... 3001`);
})

io.on("connection",(socket)=>{
    console.log("user connected: " + socket.id);

    socket.on("message",(data)=>{
        socket.broadcast.emit('message',data);
    });
});