const TodoModel = (sequelize, type) => {
	return sequelize.define('todo', {
		todoId: {
			type: type.STRING,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: type.STRING,
			allowNull: false
		},
		description: {
			type: type.STRING,
			allowNull: false
		},
		assignee: {
			type: type.STRING,
			allowNull: false
		},
		projectId: {
			type: type.STRING,
			allowNull: false
		},
		status: {
			type: type.STRING,
			allowNull: false
		},
		creatorId: {
			type: type.STRING,
			allowNull: false
		}
	});
};

export default TodoModel;