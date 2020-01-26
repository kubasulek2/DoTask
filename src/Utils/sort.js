export default {
	byName: (taskArr, tasks) => {
		let newArr = [];
		Object.values(tasks).forEach(t => taskArr.includes(t.id) ? newArr.push({ id: t.id, content: t.content }) : null);
		newArr.sort((a, b) => (a.content > b.content) ? 1 : -1);
		return newArr.map(t => t.id);
	},
	byDate: (taskArr, tasks) => {
		let newArr = [];
		Object.values(tasks).forEach(t => taskArr.includes(t.id) ? newArr.push({ id: t.id, createdAt: t.createdAt }) : null);
		newArr.sort((a, b) => (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()) ? 1 : -1);
		return newArr.map(t => t.id);
	},
	byDeadline: (taskArr, tasks) => {
		let newArr = [];
		Object.values(tasks).forEach(t => taskArr.includes(t.id) ? newArr.push({ id: t.id, deadline: t.deadline }) : null);
		newArr.sort((a, b) => (new Date(a.deadline).getTime() < new Date(b.deadline).getTime()) ? 1 : -1);
		return newArr.map(t => t.id);
	},
	byPriority: (taskArr, tasks) => {
		let newArr = [];
		Object.values(tasks).forEach(t => (taskArr.includes(t.id) && t.favorite)? newArr.push(t.id) : null);
		Object.values(tasks).forEach(t => (taskArr.includes(t.id) && !t.favorite)? newArr.push(t.id) : null);
		return newArr;
	}
};

