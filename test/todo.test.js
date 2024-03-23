const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models') 
//buat bulk insert
const { queryInterface } = sequelize
const BASE_URL = "/api/todo"

beforeAll( async () => {
    try {
        await queryInterface.bulkInsert("Todos", [
            {
                id: 5001,
                title: "Todo A",
                description: "Task A",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                id: 5002,
                title: "Todo B",
                description: "Task B",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                id: 5003,
                title: "Todo C",
                description: "Task C",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                id: 5004,
                title: "Todo D",
                description: "Task D",
                createdAt: new Date(),
                updatedAt: new Date()

            },
            {
                id: 5005,
                title: "Todo E",
                description: "Task E",
                createdAt: new Date(),
                updatedAt: new Date()

            },
        ], {})
    } catch (error) {
        console.log(error)
    }
})

afterAll( async () => {
    try {
        await queryInterface.bulkDelete('Todos', null)
    } catch (error) {
        console.log(error)
    }
})

//Unit testing
describe('GET list Todo /api/todo', () => {
    test('GET /api/todo', (done) => {

        //supertest
        request(app)
        .get(`${BASE_URL}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then( response => {
            const {body} = response
            // console.log(body)
            const {todo} = body
            expect(todo.length).toEqual(5)
            done()
        })
        .catch(err => {
            done(err)
        })
    })

})

describe('Get Todo by Id /api/todo/:id', () => {

    test('POST /api/todo/:id', (done) => {
        request(app)
        .post(`${BASE_URL}/5005`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            const {body} = response
            const {todo} = body
            // console.log(body)
            const {id, title, description} = todo
    
            expect(id).toEqual(5005)
            expect(title).toBe("Todo E")
            expect(description).toBe("Task E")
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    test('Id not Found', (done) => {
        request(app)
        .post(`${BASE_URL}/5023`)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
            const {body} = response
            const {message} = body
            // console.log(body)
 
            expect(message).toBe("Id Not Found")
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})

describe('Add Todo /api/todo', () => {
    test('POST /api/todo', (done) => {
        const addTodo = {
            title: 'New Todo',
            description: 'New Task'
        }

        request(app)
        .post(BASE_URL) 
        .send(addTodo)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            const { body } = response;
            const { newTodo } = body;
            // console.log(body)
            const { title, description } = newTodo;

            expect(title).toBe(addTodo.title);
            expect(description).toBe(addTodo.description);
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    test('title and description required!', (done) => {
        
        request(app)
        .post(BASE_URL) 
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
            const { body } = response;
            const { message } = body;
            console.log(message)
            expect(message).toBe("Title and Description are required!")
            done();
        })
        .catch(err => {
            done(err);
        });
    });

});

describe('Update Todo by Id /api/todo/:id with PUT Method', () => {
    test('Update /api/todo/:id', (done) => {
        const updateTodo = {
            title: 'Updated Todo',
            description: 'Updated Task'
        }

        request(app)
        .put(`${BASE_URL}/5003`)
        .send(updateTodo)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            const {body} = response
            const {todo} = body
            // console.log(body)
            const {title, description} = todo
            expect(title).toBe(updateTodo.title);
            expect(description).toBe(updateTodo.description);
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    test('Id not Found', (done) => {
        request(app)
        .put(`${BASE_URL}/5023`)
        .expect('Content-Type', /json/)
        .expect(403)
        .then(response => {
            const {body} = response
            const {message} = body
            // console.log(body)
            expect(message).toBe("Id Not Found")
            done()
        })
        .catch(err => {
            done(err)
        })
    })

    test('No data to update!', (done) => {
        
        request(app)
        .put(`${BASE_URL}/5003`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(response => {
            const {body} = response
            const {message} = body
            // console.log(body)
            expect(message).toBe("No data to update");
            done();
        })
        .catch(err => {
            done(err);
        });
    });
})

describe('Delete Todo by Id /api/todo/:id with DELETE Method', () => {
    test('Delete /api/todo/:id', (done) => {
         request(app)
        .delete(`${BASE_URL}/5003`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            const {body} = response
            const {todo} = body
            // console.log(body)
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    test('Id not Found', (done) => {
        request(app)
        .delete(`${BASE_URL}/5087`)
        .expect('Content-Type', /json/)
        .expect(404)
        .then(response => {
            const {body} = response
            const {message} = body
            // console.log(body)
            expect(message).toBe("Id Not Found")
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})