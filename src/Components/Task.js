import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	border: 1px solid lightgrey;
	padding: 8px;
	border-radius: 2px;
	margin-bottom: 8px;
	background-color: white;

`;

const Task = ({ task, index }) => {
	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided)=> (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{task.content}
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
