import {
  GET_MEALS,
  RESET_LOADING,
  REGISTER_USER,
  SIGN_OUT,
  CURRENT_PAGE,
} from './actionTypes';

export const getMealsAction = (meals) => {
  console.log({ meals });
  return {
    type: GET_MEALS,
    payload: meals,
  };
};

export const resetLoadingAction = () => {
  return {
    type: RESET_LOADING,
  };
};

export const registerUserAction = (user) => {
  console.log({ reducer: user });
  return {
    type: REGISTER_USER,
    payload: user,
  };
};

export const SignoutAction = () => {
  return {
    type: SIGN_OUT,
  };
};

export const currentPageAction = (value) => {
  return {
    type: CURRENT_PAGE,
    payload: value,
  };
};
