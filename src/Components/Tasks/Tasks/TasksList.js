import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import Task from '../Task/Task';
import FourOhFour from '../../FourOhFour';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(3),
	}
}));

const Tasks = ({ lists, tasks, match: { params } }) => {
	const classes = useStyles();
	if (!lists[params.category] && Object.keys(tasks).length) return <FourOhFour />;

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
