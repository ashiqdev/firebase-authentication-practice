import { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { store } from '../../store/store';

const PrivateRoute = ({ children, ...rest }) => {
  const {
    state: { user },
  } = useContext(store);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.displayName ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
