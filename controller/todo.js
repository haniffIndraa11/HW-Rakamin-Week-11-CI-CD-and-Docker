const e = require('express')
const { Todo } = require('../models')
const todo = require('../models/todo')

class TodoController {
    static async getAllTodoList(req, res, next) {
        try {
            const todo = await Todo.findAll(req.query)
                if(!todo.length === 0) {
                    throw {name: "ErrorNotFound", message: "Todo list not found"}
                }
            res.status(200).json({message: "Success", todo})    
        } catch(err) {
            next(err)
        }
    }

    static async getById(req, res, next) {
        try {
            const todoId = req.params.id
            const todo = await Todo.findOne({where: {id: todoId}})
            if (!todo) {
                res.status(400).json({ message: 'Id Not Found' })
            }
            res.status(200).json({data: `Todo List with ID ${todoId}`, todo})
        } catch (err) {
            next(err)
        }
    }

    static async addTodo(req, res, next) {
        try {
            const {title, description} = req.body

            if(!title || !description){
               return res.status(400).json({ message: 'Title and Description are required!' })
            }

            const newTodo = await Todo.create({title, description}, {returning: true})

            res.status(200).json({name: `Todo list created!`, newTodo})
        } catch (err) {
            next(err)
        }
    }

    static async updateTodo(req, res, next) {
        try {
            const todoId = req.params.id
            const todoBody = req.body

            const todo = await Todo.findOne({where: {id: todoId}})
            if (!todo) {
                return res.status(403).json({ message: 'Id Not Found' })
            } 

            if (Object.keys(todoBody).length === 0){
                return res.status(404).json({ message: 'No data to update' }) 
            }

            await Todo.update(todoBody, {where: { id: todoId}})

            const updatedTodo = await Todo.findByPk(todoId)

            res.status(200).json({ message: 'Todo List Updated Successfully', todo: updatedTodo})
        } catch (err) {
            next(err)
        }
    }

    static async deleteTodo(req, res, next){
        try {
            const todoId = req.params.id

            const todo = await Todo.findOne({where: {id: todoId}})
            if (!todo) {
                return res.status(404).json({ message: 'Id Not Found' })
            }
            await todo.destroy()
            res.status(200).json({message: `Todo list with id ${todoId} deleted`})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TodoController