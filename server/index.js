const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const msgRoutes = require('./routes/messagesRoute');
const app = express();
require('dotenv').config();

const socket = require("socket.io");

app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URL , {
//     useNewUrlParser : true,
//     useUnifiedTopology : true,
// })
// .then(()=>{
//     console.log("DB connection Successfull!")
// }).catch((err)=>{
//     console.log(err.message);
// })


app.use("/api/auth", authRoutes);
app.use("/api/messages",msgRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB connection Successfull!")
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
})

const io= socket(server , {
    cors: {
        origin : "http://localhost:3000",
        credentials : true
    }
});

global.onlineUsers = new Map();

io.on("connection" , (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId) =>{
        onlineUsers.set(userId , socket.id);
    });

    socket.on("send-msg" , (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve" , data.msg);
        }
    })
})