import { makeStyles, Paper } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import banner from '../../images/bannerbackground.png';
import { getMealsAction, resetLoadingAction } from '../../store/action/actions';
import { store } from '../../store/store';

const useStyles = makeStyles((theme) => ({
  banner: {
    position: 'relative',
    color: '#fff',
    width: '100vw',
    height: '500px',
    marginTop: '60px',
    padding: '0',
    backgroundImage: ` url(${banner})`,

    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },

  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  searchBox: {
    width: '500px',
    position: 'relative',
    margin: '0 auto',
    padding: '5px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },

  searchForm: {
    height: '40px',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: '20px',
  },

  searchText: {
    fontSize: '14px',
    borderWidth: '0',
    background: 'transparent',
    lineHeight: '15px',
    width: '90%',
    // padding: "10px 0 5px 1em",
    padding: '12px',
    color: '#282828',
    outline: 'none',
  },

  searchButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    height: '40px',
    width: '80px',
    color: '#fff',
    textAlign: 'center',
    borderWidth: '0',
    backgroundColor: '#e74c3c',
    cursor: 'pointer',
    textTransform: 'uppercase',
    outline: '0',
    borderRadius: '20px',
  },
}));

const Hero = () => {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState('');

  const { dispatch } = useContext(store);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const url = ` https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    dispatch(resetLoadingAction());
    const data = await (await fetch(url)).json();
    dispatch(getMealsAction(data.meals));
  };

  return (
    <Paper className={classes.banner}>
      <div className={classes.center}>
        <div className={classes.searchBox}>
          <form className={classes.searchForm} onSubmit={onSubmitHandler}>
            <input
              className={classes.searchText}
              placeholder='Search food items...'
              type='text'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className={classes.searchButton} type='submit'>
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>
    </Paper>
  );
};

export default Hero;
