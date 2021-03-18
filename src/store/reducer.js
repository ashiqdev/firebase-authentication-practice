import {
  GET_MEALS,
  REGISTER_USER,
  RESET_LOADING,
  SET_USER,
  SIGN_OUT,
} from './action/actionTypes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case RESET_LOADING:
      console.log('hello');
      return {
        ...state,
        loading: true,
      };

    case GET_MEALS:
      const incomingmeals = action.payload || [];
      return {
        ...state,
        meals: [...incomingmeals],
        loading: false,
      };

    case REGISTER_USER:
      console.log({reducerjuice:action.payload});
      return {
        ...state,
        user: action.payload,
      };

    case SIGN_OUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
