import React, { Fragment } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import Task from '../../Task/Task';
import CreateTask from '../../../../Containers/Forms/CreateTask';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(3),
	}
}));

const Tasks = ({ lists, tasks, match: { params }, history }) => {
	const classes = useStyles();


	const taskList = Object.keys(tasks).length
		? lists[params.category].taskIds.map((id, i) => (
			<Task
				index={i}
				key={id}
				task={tasks[id]}
				history={history}
			/>
		))
		: null;

	return (
		<Droppable droppableId={'inner'}>
			{({ droppableProps, innerRef, placeholder }) => (
				<Fragment>
					<CreateTask listId={params.category}/>
					<List
						ref={innerRef}
						className={classes.root}
						{...droppableProps}
					>
						{taskList}
						{placeholder}
					</List>
				</Fragment>
			)}
		</Droppable>
	);
};

export default Tasks;
