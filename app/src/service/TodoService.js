import { Todo } from '../database/DatabaseModel';

export default {

	async addTodoItem(item) {
		try {
			console.log(item);
			await Todo.create(item);
		} catch (err) {
			console.log(err);
		}
	},

	async autoAddTodoItems() {
		for (let index = 0; index < 3; index++) {
			let todoItem = {
				todoId: `${index + 1}`,
				title: `Add function to create new tasks ${index}`,
				description: 'todo Item Description 1',
				status: 'TODO',
				projectId: '1',
				assignee: '1',
				creatorId: '1'
			};

			try {
				await Todo.create(todoItem);
			} catch (err) {
				console.log(err);
			}
		}
	},

	async getTodoItemsByProject() {
		try {
			return await Todo.findAll({where: {projectId: '1'}, raw: true});
		} catch (err) {
			console.log('getTodoItemsByProject', err);
		}
	}
};