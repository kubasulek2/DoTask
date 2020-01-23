import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import NoDragTask from '../Task/NoDragTask';
import CategoryBadge from '../../UI/CategoryBadge';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(1),
	}
}));

const Tasks = ({ tasks: { tasks, lists } }) => {
	const classes = useStyles();
	console.log(lists);	
	const taskList = Object.values(lists).filter(list => list.taskIds.length).map(list => (
		<List className={classes.root} key={list.id}>
			<CategoryBadge text={list.title}/>
			{list.taskIds.map(id => (<NoDragTask key={id} text={tasks[id].content} />))}
		</List>
	));
	//const taskList = Object.values(tasks).map(task => <NoDragTask key={task.id} text={task.content} />);
	
	return taskList;
};

export default Tasks;
