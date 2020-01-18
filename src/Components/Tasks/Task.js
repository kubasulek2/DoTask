import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import ListItem from '@material-ui/core/ListItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Task = ({ text, id, index }) => {
	return (
		<Draggable draggableId={id} index={index}>
			{({ draggableProps, dragHandleProps, innerRef }) => (
				<ListItem
					ref={innerRef}
					{...draggableProps}
					{...dragHandleProps}
				>
					<ExpansionPanel
						onClick={e => { e.preventDefault(); }}
						open={false}
					>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>{text}</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
								sit amet blandit leo lobortis eget.
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>

				</ListItem>
			)}
		</Draggable>
	);
};

export default Task;
