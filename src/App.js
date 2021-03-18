import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Meals from './Views/Meals/Meals';
import { useContext, useEffect, useState } from 'react';
import Header from './Views/Header/Header';
import MealDetails from './Views/MealDetails/MealDetails';
import SignUp from './Views/SignUp/SignUp';
import PrivateRoute from './Views/PrivateRoute/PrivateRoute';
import SignIn from './Views/SignIn/SignIn';
import { auth } from './utils/firebase.config';
import { store } from './store/store';

import { registerUserAction } from './store/action/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? 'dark' : 'light';

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const {
    dispatch,
    state: { user },
  } = useContext(store);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          console.log({ ruqua: user });
          const { displayName, email: userEmail, photoURL } = user;
          dispatch(registerUserAction({ displayName, userEmail, photoURL }));
        }
      } catch (error) {
        // console.log(error.message);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <ToastContainer
          position='bottom-left'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Header handleThemeChange={handleThemeChange} darkState={darkState} />

        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <Meals {...props} darkState={darkState} />}
          />

          <PrivateRoute exact path='/meal/:name'>
            <MealDetails />
          </PrivateRoute>

          <Route exact path='/register'>
            <SignUp />
          </Route>

          <Route exact path='/login'>
            <SignIn />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
