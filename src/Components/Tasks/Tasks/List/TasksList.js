import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import Task from '../../Task/Task';

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
				id={id}
				text={tasks[id].content}
				favorite={tasks[id].favorite}
				deadline={tasks[id].deadline}
				attachments={tasks[id].attachments}
				history={history}
			/>
		))
		: null;

	return (
		<Droppable droppableId={'inner'}>
			{({ droppableProps, innerRef, placeholder }) => (
				<List
					ref={innerRef}
					className={classes.root}
					{...droppableProps}
				>
					{taskList}
					{placeholder}
				</List>
			)}
		</Droppable>
	);
};

export default Tasks;
