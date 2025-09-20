const express=require('express')
const router=express.Router()

// Add Todos
const AddTodos=require("../controller/AddTodos")
router.post('/add-todos',AddTodos)

// Display Todos
const showTodos=require('../controller/GetTodos')
router.get('/get-todos',showTodos)

// Edit Todos
const editTodos=require('../controller/EditTodos')
router.get('/edit-todos/:id',editTodos)

//Update Todos
const updateTodos=require('../controller/UpdateTodos')
router.put('/update-todos/:id',updateTodos)

// Delete todos
const deleteTodos=require('../controller/DeleteTodos')
router.delete('/delete-todos/:id',deleteTodos)

// Update status
const updateStatus=require("../controller/UpdateStatus")
router.put('/status/:id',updateStatus)

module.exports=router