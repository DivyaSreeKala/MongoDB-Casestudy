

const express = require('express');
// const app = new express();

const router = express.Router()

router.use(express.json());//json data
router.use(express.urlencoded({extended:true}));

require('dotenv').config();

const employeeModal = require('../modal/EmployeeData')

const nav = [
    {
        link : '/employee/list-employee',
        name : 'Home'
    },
    {
        link : '/employee/add',
        name : 'Add Employee'
    }
]
// function getAllRoutes(nav){

router.get('/add',(req,res)=>{
    res.render('AddEmployee',{
        title :" Home Page",
        nav
    })
})



router.post('/add-employee',async (req,res)=>{
    // res.render("home.ejs")
    try{
        const data = req.body;
        const employeeModal1 = new employeeModal(data);
        const savedData = await  employeeModal1.save();
        res.status(200).send("post successful")

    }catch(err){
        res.status(404).send("post unsuccessful")
    }
})

router.get('/list-employee',async (req,res)=>{
    // res.render("home.ejs")
    try{
        // const data = req.body;
        // const employeeModal1 = new employeeModal(data);
        const data = await  employeeModal.find();
        res.status(200).render('home',{
            title :"Home Page",
            nav,
            data
        })

    }catch(err){
        res.status(404).send("get unsuccessful")
    }
})

router.put('/edit-employee/:id',async (req,res)=>{
    // res.render("home.ejs")
    try{
        const data = req.body;
        const id = req.params.id;
        const employeeModal1 = new employeeModal(data);
        // console.log(employeeModal1)
        // console.log(req.body)
        const savedData = await  employeeModal.findByIdAndUpdate(id,req.body);
        res.status(200).send("update successful")

    }catch(err){
        console.log(err)
        res.status(404).send("update unsuccessful")
    }
})

router.delete('/delete-employee/:id',async (req,res)=>{
    // res.render("home.ejs")
    try{
        // const data = req.body;
        const id = req.params.id;
        const savedData = await  employeeModal.findByIdAndDelete(id);
        res.status(200).send("delete successful")

    }catch(err){
        console.log(err)
        res.status(404).send("delete unsuccessful")
    }
})

// }

module.exports = router;