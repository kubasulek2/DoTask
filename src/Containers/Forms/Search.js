import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import SearchIcon from '@material-ui/icons/Search';

const styles = (({ palette, spacing }) => ({
	listItem: {
		width: 270,
		padding: spacing(.5)
	},
	hover: {
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.08)',
			'& input': {
				background: 'inherit'
			}
		}
	},
	searchButton: {
		color: palette.primary.light
	},
	search: {
		fontSize: 16,
		padding: 8,
		border: 'none',
		color: palette.secondary.light,
		'&::placeholder': {
			color: palette.grey[400]
		},
		'&:focus': {
			outline: 'none'
		},

	}
}));

class Search extends Component {
	state = { value: '' };
	searchRef = React.createRef();

	componentDidMount() {
		const { focus, setFocus } = this.props;

		if (focus) {
			this.searchRef.current.focus();
			setFocus(false);
		}
	}


	handleChange = event => this.setState({ value: event.target.value });

	handleSubmit = event => {
		const {history} = this.props;
		const uri = encodeURIComponent(this.state.value);
		const query = '?query='+ uri;
		
		event.preventDefault();
		history.push('/tasks/search' + query);
		this.setState({value: ''});
	}

	render() {
		const { classes } = this.props;
		const { value } = this.state;
		return (
			<ListItem className={[classes.listItem, classes.hover].join(' ')}>
				<form onSubmit={this.handleSubmit}>
					<IconButton className={classes.searchButton} type='submit'>
						<SearchIcon />
					</IconButton>
					<input
						type='text'
						placeholder='search'
						className={classes.search}
						value={value}
						onChange={this.handleChange}
						ref={this.searchRef}
					/>
				</form>
			</ListItem>
		);
	}
}

export default withRouter(withStyles(styles)(Search));


