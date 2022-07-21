const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user-routes');
const roleRouter = require('./routes/role-routers')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cookieParser());
app.use(express.json()); //backend to database
app.use('/users', userRouter);
app.use('/roles', roleRouter)

mongoose.connect("mongodb+srv://Swethambari:Swetha27gmail@cluster0.u2in2gx.mongodb.net/management?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connnected to Database")
    })
    .then(() => {
        app.listen(8000);
    })
    .catch(err => console.log(err))
