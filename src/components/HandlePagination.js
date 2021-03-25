import { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Meal from '../Views/Meal/Meal';
import { store } from '../store/store';
import { currentPageAction } from '../store/action/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const HanldePagination = ({ meals, darkState }) => {
  const classes = useStyles();

  const {
    dispatch,
    state: { currentPage, loading },
  } = useContext(store);
  // const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = meals.slice(indexOfFirstItem, indexOfLastItem);

  const buttonCount = Math.ceil(meals.length / itemsPerPage);

  const handleChange = (event, value) => {
    dispatch(currentPageAction(value));
    console.log({ value });
  };

  return (
    <>
      {currentItems.length > 0 ? (
        <>
          {currentItems.map((meal) => (
            <Meal darkState={darkState} key={meal.idMeal} {...meal} />
          ))}
          <Pagination
            style={{
              paddingBottom: '3rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
            count={buttonCount}
            variant='outlined'
            color='secondary'
            page={currentPage}
            onChange={handleChange}
          />
        </>
      ) : (
        <div>
          {!loading && <p>Your search did not match any recipe resuls.</p>}
        </div>
      )}
    </>
  );
};

export default HanldePagination;
