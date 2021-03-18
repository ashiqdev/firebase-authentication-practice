import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import KitchenIcon from '@material-ui/icons/Kitchen';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';
import { store } from '../../store/store';
import { auth } from '../../utils/firebase.config';
import { registerUserAction } from '../../store/action/actions';

const override = css`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
`;

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 240,
  },
});

const MealDetails = () => {
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState({});
  const classes = useStyles();
  const { name } = useParams();

  const { dispatch } = useContext(store);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const url = ` https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
      const data = await (await fetch(url)).json();

      setMeal(data.meals[0]);
      setLoading(false);

      const { displayName, email: userEmail, photoURL } = auth.currentUser;
    };

    fetchData();
  }, []);

  const {
    strMealThumb,
    strMeal,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
  } = meal;
  return (
    <Container maxWidth='sm'>
      <Box m={12} />

      {loading && (
        <ScaleLoader
          loading={loading}
          color='rgb(75, 85, 99)'
          css={override}
          size={15}
        />
      )}

      {strMealThumb && (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={strMealThumb && strMealThumb}
              title='Contemplative Reptile'
            />

            <CardContent>
              <Typography gutterBottom variant='h4' component='h2'>
                {strMeal}
              </Typography>

              <Typography gutterBottom variant='h5' component='h2'>
                Ingredients:
              </Typography>

              <Divider />

              <List component='nav' aria-label='main mailbox folders'>
                <ListItem button>
                  <ListItemIcon>
                    <KitchenIcon />
                  </ListItemIcon>
                  <ListItemText primary={strIngredient1} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <KitchenIcon />
                  </ListItemIcon>
                  <ListItemText primary={strIngredient2} />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <KitchenIcon />
                  </ListItemIcon>
                  <ListItemText primary={strIngredient3} />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <KitchenIcon />
                  </ListItemIcon>
                  <ListItemText primary={strIngredient4} />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <KitchenIcon />
                  </ListItemIcon>
                  <ListItemText primary={strIngredient5} />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <KitchenIcon />
                  </ListItemIcon>
                  <ListItemText primary={strIngredient6} />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <KitchenIcon />
                  </ListItemIcon>
                  <ListItemText primary={strIngredient7} />
                </ListItem>
              </List>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </Container>
  );
};

export default MealDetails;
