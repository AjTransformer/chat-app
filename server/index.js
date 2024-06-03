const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');


const app = express();
require('dotenv').config();

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


app.use("/api/auth/", authRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB connection Successfull!")
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
})