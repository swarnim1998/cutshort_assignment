const { createToDo, updateToDo, deleteToDo, getToDos } = require('../services/todo')
const { postApiBody, updatedData } = require('./testcases')

/** post api*/
test('should give below response', () => { 
  expect(createToDo({_id: '6427ddcd343e21071e3bc737'}, {title: "1st todo list"})).toBe("ToDo Successfully Created")
})