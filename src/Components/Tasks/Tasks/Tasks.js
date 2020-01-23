import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';

import Task from '../Task';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(3),
	}
}));

const Tasks = ({ tasks: { lists, active, tasks } }) => {
	const classes = useStyles();
	const taskList = lists[active].taskIds.map((id, i) => <Task index={i} key={id} id={id} text={tasks[id].content} />);
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





