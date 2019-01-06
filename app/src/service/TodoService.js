import { Todo } from '../database/DatabaseModel';
const Sequelize = require('sequelize');

export default {

  async addTodoItem(item) {
    try {
      console.log(item);
      await Todo.create(item);
    } catch (err) {
      console.log(err);
    }
  },

  async updateTodoItem(statusId, todoId) {
    console.log(todoId);
    try {
      await Todo.update(
        { statusId },
        { where: { todoId } }
      );
    } catch (err) {
      console.log(err);
    }
  },

  async updateOrderOfTodoItem(todoId, order) {
    try {
      await Todo.update(
        { order },
        { where: { todoId } }
      );
    } catch (err) {
      console.log(err);
    }
  },

  async autoAddTodoItems() {
    for (let index = 0; index < 5; index++) {
      let todoItem = {
        todoId: `${index + 1}`,
        title: `Add function to create new tasks ${index + 1}`,
        description: `todo Item Description ${index + 1}`,
        statusId: '1',
        projectId: '1',
        assignee: '1',
        creatorId: '1',
        order: index
      };

      try {
        await Todo.create(todoItem);
      } catch (err) {
        console.log(err);
      }
    }
  },

  async getTodoItemsByProject(projectId = '1') {
    try {
      return await Todo.findAll(
        {
          where: {
            projectId
          },
          order: Sequelize.col('order'),
          raw: true
        }
      );
    } catch (err) {
      console.log('getTodoItemsByProject', err);
    }
  },


  async getTodoItemsByProjectAndStatus(statusId, projectId = '1') {
    try {
      return await Todo.findAll(
        {
          where: {
            projectId,
            statusId
          }, raw: true
        }
      );
    } catch (err) {
      console.log('getTodoItemsByProjectAndStatus', err);
    }
  }
};