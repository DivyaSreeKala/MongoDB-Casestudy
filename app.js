

const express = require('express');
const app = new express();

const morgan = require('morgan');
app.use(morgan('dev'));

app.set('view engine','ejs');
app.set('views',__dirname+'/views')


const movieRoutes = require('./router/employeeRoutes');
app.use('/employee',movieRoutes);

require('./db/connection')


require('dotenv').config();//require .env file

PORT = process.env.PORT;





app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})