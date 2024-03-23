const { Todo } = require('../models')

async function createTodo() {
    try {
        const newData = await Todo.create({
                title: 'Todo 10',
                description: 'learn OOP'
        })
        console.log('Data berhasil ditambah', newData.toJSON())
    } catch (error) {
        console.error('Gagal menambah data', error)
    }

    // try {
    //     const newData = await Todo.destroy({
    //             id: 1     
    //     })
    //     console.log('Data berhasil dihapus')
    // } catch (error) {
    //     console.error('Gagal menghapus data', error)
    // }
}

createTodo()
