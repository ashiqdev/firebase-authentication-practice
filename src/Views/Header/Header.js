import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import Switch from '@material-ui/core/Switch';
import { useContext } from 'react';
import { store } from '../../store/store';
import { auth } from '../../utils/firebase.config';
import { SignoutAction } from '../../store/action/actions';
import { Avatar } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  avatar: {
    backgroundColor: red[500],
    marginRight: '1rem',
  },
}));

const Header = (props) => {
  const { darkState, handleThemeChange } = props;
  const history = useHistory();
  const classes = useStyles();

  const {
    dispatch,
    state: { user },
  } = useContext(store);

  console.log({ header: user });

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <LanguageIcon />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          <Button
            onClick={() => history.push('/')}
            style={{ color: 'white' }}
            variant='text'
          >
            Meals
          </Button>
        </Typography>

        {user?.displayName ? (
          <>
            <>
              {/* <Typography>{user.displayName}</Typography> */}

              <Avatar className={classes.avatar}>
                {user.displayName?.charAt(0).toUpperCase()}
              </Avatar>
              <Button
                onClick={() => {
                  auth.signOut();
                  dispatch(SignoutAction());
                  toast.dark(
                    ` ${user.displayName} is signed out from our system`
                  );
                }}
                style={{ color: 'white' }}
              >
                Sign Out
              </Button>
            </>
          </>
        ) : (
          <>
            <Button
              onClick={() => history.push('/login')}
              style={{ color: 'white' }}
              variant='text'
            >
              Login
            </Button>

            <Button
              onClick={() => history.push('/register')}
              style={{ color: 'white' }}
              variant='text'
            >
              SignUp
            </Button>
          </>
        )}
        <Button color='inherit'>
          <Switch checked={darkState} onChange={handleThemeChange} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
