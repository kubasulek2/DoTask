export const data = {
	tasks: {
		tasks: {
			'task-1': { id: 'task-1', content: 'Take out Garbage', favorite: false },
			'task-2': { id: 'task-2', content: 'Watch tv', favorite: true },
			'task-3': { id: 'task-3', content: 'Go out', favorite: true },
			'task-4': { id: 'task-4', content: 'Sleep', favorite: false },
		},
		lists: {
			'list-1': {
				id: 'list-1',
				title: 'Private',
				taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
			},
			'list-2': {
				id: 'list-2',
				title: 'Books',
				taskIds: []
			},
			'list-3': {
				id: 'list-3',
				title: 'shop List',
				taskIds: []
			}
		},
		listsOrder: ['list-1', 'list-2', 'list-3'],
	},
	app: {
		loading: false,
		isAuth: true,
		error: false
	}
};
