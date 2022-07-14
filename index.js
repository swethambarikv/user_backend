const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user-routes');
const adminRouter = require('./routes/admin-routes');
const roleRouter = require('./routes/role-routers')
const api=require('./routes/api')
const app = express();
const cors=require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();

app.use(cors({origin:'http://localhost:4200'}));

app.use(cookieParser());
app.use(express.json());   
app.use('/users', userRouter);
app.use('/admin',adminRouter);
app.use('/api',api);
app.use('/roles',roleRouter)

mongoose.connect("mongodb+srv://Swethambari:Swetha27gmail@cluster0.u2in2gx.mongodb.net/management?retryWrites=true&w=majority")
// mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("Connnected to Database")
        // console.log("DB: "+process.env.DB_CONNECT)
        // console.log("SECRET KEY: "+process.env.SECRET_KEY)
    })
    .then(() => {
        app.listen(8000);
    })
    .catch(err => console.log(err))
