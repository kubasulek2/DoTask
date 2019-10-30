import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task';

const Container = styled.div`
	margin: 8px;
	border: 1px solid grey;
	border-radius: 2px; 
	width: 400px;
`;
const Title = styled.h3`
	padding: 8px;
`;
const TaskList = styled.div`
	padding: 8px;
	transition: background-color .3s ease;
	background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'}
`;
const Column = ({ column, tasks }) => {
	return (
		<Container>
			<Title>{column.title}</Title>
			<Droppable 
				droppableId={column.id}
				style={{minHeight: '200px'}}
			>
				{(provided, snapshot) => (
					<TaskList
						ref={provided.innerRef}
						isDraggingOver={snapshot.isDraggingOver}
						{...provided.droppableProps}

					>
						{tasks.map((task, i) => <Task key={task.id} task={task} index={i}/>)}
						{provided.placeholder}
					</TaskList>
				)}
			</Droppable>
		</Container>
	);
};

export default Column;
