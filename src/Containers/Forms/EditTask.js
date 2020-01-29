import React, { Component } from 'react';

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const styles = ({palette}) => ({
	card: {
		maxWidth: 600,
		width: '80%',
		minWidth: 280,
		margin: 'auto',
	},
	editButton: {
		color: palette.error.light
	}
	
	
});

class EditTask extends Component {

	render() {
		const {classes, task} = this.props; 
		if(!task) return null;
		return (
			<Card className={classes.card}>
				<CardHeader
					action={
						<IconButton className={classes.editButton}>
							<EditIcon  fontSize='large'/>
						</IconButton>
					}
					title={task.content}
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						This impressive paella is a perfect party dish and a fun meal to cook together with your
						guests. Add 1 cup of frozen peas along with the mussels, if you like.
					</Typography>
				</CardContent>
			
				<CardContent>
					<Typography paragraph>Method:</Typography>
					<Typography paragraph>
						Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
						minutes.
					</Typography>
					<Typography paragraph>
						Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
						heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
						browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
						and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
						pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
						saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
					</Typography>
					<Typography paragraph>
						Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
						without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
						medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
						again without stirring, until mussels have opened and rice is just tender, 5 to 7
						minutes more. (Discard any mussels that don’t open.)
					</Typography>
					<Typography>
						Set aside off of the heat to let rest for 10 minutes, and then serve.
					</Typography>
				</CardContent>
				<CardActions disableSpacing >
					<Button variant='contained' color='primary' size='large'>Cancel</Button>
				</CardActions>
			</Card>
		);

	}
}

export default withStyles(styles)(EditTask);
