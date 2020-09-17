const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
dotenv.config({path:'./config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

//DB connection
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(con=>{
    console.log('DB connected')
});

const port = process.env.PORT;
const giftRouter = require('./routes/giftRoutes/giftRoutes');

//mounting of router
//middleware
app.use('/giftapi/v1/gifts',giftRouter);    

app.listen(port,()=>{
    console.log(`App running on port :: ${port}`);
});

