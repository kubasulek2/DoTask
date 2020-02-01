import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import NoDragTask from '../../Task/NoDragTask';
import CategoryBadge from '../../../UI/CategoryBadge';
import CreateTask from '../../../../Containers/Forms/CreateTask';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(1),
	}
}));

const Tasks = ({ tasks, lists, history }) => {
	const classes = useStyles();

	const taskList = Object.values(lists).filter(list => list.taskIds.length).map(list => (
		<List className={classes.root} key={list.id}>
			<CategoryBadge text={list.title} />
			{list.taskIds.map(id => (
				<NoDragTask
					key={id}
					task={tasks[id]}
					history={history}
				/>
			))}
		</List>
	));

	return (
		<Fragment>
			<CreateTask listId='default'/>
			{taskList}
		</Fragment>
	);
};

export default Tasks;
