import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import NoDragTask from '../../Task/NoDragTask';
import CategoryBadge from '../../../UI/CategoryBadge';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(1),
	}
}));

const Tasks = ({ tasks, lists }) => {
	const classes = useStyles();

	const taskList = Object.values(lists).filter(list => list.taskIds.length).map(list => (
		<List className={classes.root} key={list.id}>
			<CategoryBadge text={list.title} />
			{list.taskIds.map(id => (
				<NoDragTask
					key={id}
					id={id}
					text={tasks[id].content}
					favorite={tasks[id].favorite}
					deadline={tasks[id].deadline}
					attachments={tasks[id].attachments}
				/>
			))}
		</List>
	));

	return taskList;
};

export default Tasks;
