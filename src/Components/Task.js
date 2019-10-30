import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	border: 1px solid lightgrey;
	padding: 8px;
	border-radius: 2px;
	margin-bottom: 8px;
	background-color: ${props => props.isDragging? 'lightgreen' : 'white'};
	min-height: 50px; /* to be able to drop anything if list is empty */

`;
const DragHandle = styled.div`
	width: 20px;
	height: 20px;
	background-color: lightskyblue;
	border-radius: 4px;
	margin-right: 8px;
	display: inline-block;
`;
const Task = ({ task, index }) => {
	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided, snapshot)=> (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					isDragging={snapshot.isDragging}
				>
					<DragHandle 
						{...provided.dragHandleProps}
					/>
					{task.content}
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
