

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
        const data1 = req.body;
        const employeeModal1 = new employeeModal(data1);
        const savedData = await employeeModal1.save();
        const data = await employeeModal.find();
        res.status(200).render('AddEmployee',{
            title: 'Add Employee',
            nav,
            data,
            message: 'added successfully'   
        })

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
            title :"List Employees",
            nav,
            data
        })

    }catch(err){
        res.status(404).send("get unsuccessful")
    }
})

router.put('/edit-employee/:id?',async (req,res)=>{
    // res.render("home.ejs")
    try{
        const data = req.body;
        const id = req.params.id;
        // const employeeModal1 = new employeeModal(data);
        // console.log(employeeModal1)
        // console.log(req.body)
        console.log(id)
        const data1 = await employeeModal.findById(id,data)
        // console.log(employeeModal1)//_id also included here which is immutable and shows error
        const savedData = await  employeeModal.findByIdAndUpdate(id,data, { new: true } );
        console.log(savedData)
        // res.status(200).send('update successful')
        res.status(200).render('UpdateEmployee',{ title:'update' , nav , data1 , message:'update successful', success: true})

    }catch(err){
        console.log(err)
        res.status(404).send("update unsuccessful")
    }
})
router.get('/edit-emp/:id',async (req,res)=>{
    // res.render("home.ejs")
    try{
        const data = req.body;
        const id = req.params.id;
        // const employeeModal1 = new employeeModal();
        // console.log(employeeModal1)
        // console.log(req.body)
        const data1 = await employeeModal.findById(id)
        // console.log(data1)
        // const savedData = await  employeeModal.findByIdAndUpdate(id,req.body);
        res.status(200).render('UpdateEmployee',{
            title : 'Update',
            nav,
            data1
        })

    }catch(err){
        console.log(err)
        res.status(404).send("update render unsuccessful")
    }
})
router.delete('/delete-employee/:id',async (req,res)=>{
    // res.render("home.ejs")
    try{
        // const data = req.body;
        const id = req.params.id;
        const savedData = await  employeeModal.findByIdAndDelete(id);
        const data = await employeeModal.find();
        res.status(200).render('home',{title:'List Employees',nav,data,message: 'Deleted Successfully'})

    }catch(err){
        console.log(err)
        res.status(404).send("delete unsuccessful")
    }
})

// }

module.exports = router;