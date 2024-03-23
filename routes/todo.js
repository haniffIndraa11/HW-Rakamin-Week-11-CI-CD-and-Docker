const express = require('express')
const router = express.Router()
const controller = require('../controller/todo')

router.get('/', controller.getAllTodoList)
router.post('/:id', controller.getById)
router.post('/', controller.addTodo)
router.put('/:id', controller.updateTodo)
router.delete('/:id', controller.deleteTodo)

module.exports = router