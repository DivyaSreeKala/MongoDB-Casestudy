
const mongoose = require('mongoose');


const conn = mongoose.connect(process.env.MongoDB_URL).then(()=>{
    console.log('connection successful');
}).catch((err)=>{
    console.log(err)
})

