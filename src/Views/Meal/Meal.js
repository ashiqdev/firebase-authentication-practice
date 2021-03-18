import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { Box, Button, CardActionArea } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const Meal = (props) => {
  const history = useHistory();
  const {
    strMealThumb: image,
    strMeal: mealName,
    strCategory,
    strInstructions,
    darkState,
  } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title='Recipe' />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {mealName}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {strInstructions.substr(1, 100)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={() => history.push(`/meal/${mealName}`)}
            size='small'
            color={!darkState ? 'primary' : 'secondary'}
          >
            Details
          </Button>
        </CardActions>
      </Card>

      <Box m={6} />
    </Grid>
  );
};

export default Meal;
