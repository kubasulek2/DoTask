import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

import * as actions from '../../Store/Actions';

const styles = (({ palette, breakpoints }) => ({
	delete: {
		marginRight: 'auto',
		marginLeft: 8,
		'& svg': {
			color: palette.error.light
		}
	},
	input: {
		display: 'flex',
		justifyContent: 'center',
		'& .MuiFormControl-root': {
			width: '100%',
			[breakpoints.up('sm')]: {
				width: '90%',
			}
		}
	},
	content: {
		'&:first-child': {
			paddingTop: 8
		}
	}
}));

export class List extends Component {

	state = { value: '' }
	listRef = createRef();

	componentDidMount() {
		const { listId, lists } = this.props;
		this.listRef.current.focus();

		if (listId
			&& Object.keys(lists).length
			&& !this.state.value.length
		) {
			this.setState({ value: lists[listId].title });
		}
	}
	componentDidUpdate() {
		const { listId, lists } = this.props;
		if (listId
			&& Object.keys(lists).length
			&& !this.state.value.length
		) {
			this.setState({ value: lists[listId].title });
			this.listRef.current.focus();
		}
	}


	handleChange = event => this.setState({ value: event.target.value })
	handleDelete = () => {
		const { listId, deleteList, history } = this.props;
		deleteList(listId);
		history.push('/tasks/all');
	};

	handleSubmit = event => {
		const { handleClose, editList, createList, listId, lists, edit } = this.props;
		event.preventDefault();


		if (edit) {
			if (!this.state.value.length || this.state.value === lists[listId].title) return handleClose();
			editList(this.state.value, listId);
		}
		else {
			if (!this.state.value.length) return handleClose();
			createList(this.state.value);
		}
		handleClose();
	}

	render() {
		const { handleClose, edit, classes } = this.props;
		return (
			<form onSubmit={this.handleSubmit}>
				<DialogContent className={classes.content}>
					<div className={classes.input}>
						<TextField
							placeholder='List name'
							variant="outlined"
							inputRef={this.listRef}
							value={this.state.value}
							onChange={this.handleChange}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					{edit
						? <Tooltip enterDelay={800} title='delete task' arrow>
							<IconButton className={classes.delete} onClick={this.handleDelete}>
								<Delete color='error' />
							</IconButton>
						</Tooltip>
						: null
					}
					<Button onClick={handleClose} color="secondary">
						Cancel
					</Button>
					<Button type='submit' color="primary">
						Ok
					</Button>
				</DialogActions>
			</form>
		);
	}
}
const mapStateToProps = state => ({
	lists: state.tasks.lists
});
const mapDispatchToProps = dispatch => ({
	editList: (title, listId) => dispatch(actions.editList(title, listId)),
	createList: title => dispatch(actions.createList(title)),
	deleteList: listId => dispatch(actions.deleteList(listId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(List));
