import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Meal from '../Meal/Meal';
import { Box, Container } from '@material-ui/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';
import { store } from '../../store/store';
import { getMealsAction } from '../../store/action/actions';
import Hero from '../Hero/Hero';
import Pagination from '../../components/HandlePagination';
import HanldePagination from '../../components/HandlePagination';

const override = css`
  display: block;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
`;

const Meals = ({ darkState }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

  const {
    dispatch,
    state: { meals, loading },
  } = useContext(store);

  const [spacing, setSpacing] = useState(2);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
      const data = await (await fetch(url)).json();

      dispatch(getMealsAction(data.meals));

      console.log(meals);
    };

    fetchData();
  }, []);
  return (
    <>
      <Hero />
      <Container maxWidth='lg'>
        <Grid container className={classes.root} spacing={2}>
          <Box m={6} />
          <Grid item xs={12}>
            <Grid container justify='center' spacing={spacing}>
              {loading && (
                <>
                  <ScaleLoader
                    loading={loading}
                    color='rgb(75, 85, 99)'
                    css={override}
                    size={15}
                  />
                </>
              )}

              <HanldePagination meals={meals} darkState={darkState} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Meals;
