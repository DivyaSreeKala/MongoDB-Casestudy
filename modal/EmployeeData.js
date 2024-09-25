
const mongoose = require('mongoose');

const employeeModal = mongoose.Schema({
    employeeName : String,
    emploeeDesignation : String,
    employeeLocation : String,
    Salary : Number
})

const employeeData = mongoose.model('employee',employeeModal)//map collection name with schema defined

module.exports = employeeData;