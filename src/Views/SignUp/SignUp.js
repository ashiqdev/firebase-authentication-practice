import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import Form from '../../components/Form';
import Input from '../../components/Input';
import MainContainer from '../../components/MainContainer';

import DividerWithText from '../../components/DividerWithText';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import banner from '../../images/signup-bg.png';
// import { UseData } from '../DataContext';
import PrimaryButton from '../../components/PrimaryButton';
import { ExitToApp, LockOpen } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { store } from '../../store/store';
import { registerUserAction } from '../../store/action/actions';
import { registerUser } from '../../utils/firebaseManager';
import { auth } from '../../utils/firebase.config';
import { toast } from 'react-toastify';

import ScaleLoader from 'react-spinners/ScaleLoader';

const useStyles = makeStyles((theme) => ({
  banner: {
    position: 'relative',
    color: '#fff',
    // height: '100vh',
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

  margin: {
    marginLeft: '1rem',
  },
}));

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, 'name should not contain numbers')
    .required('Name is a required field'),
  email: yup
    .string()
    .email('email should have correct format')
    .required('Email is a required field'),

  password: yup
    .string()
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      'password must contain at least 1 number, 1 uppercase, 1 lowercase letter and at least 8 or more characters'
    )
    .required('Password is a required field'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Does not match with password!')
    .required('confirmPassword is a required field'),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  // const { setValues, data } = UseData();
  const { register, handleSubmit, errors } = useForm({
    // defaultValues: {
    //   name: data.name,
    //   email: data.email,
    // },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const location = useLocation();
  const {
    dispatch,
    state: { user },
  } = useContext(store);

  let { from } = location.state || { from: { pathname: '/' } };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { name, email, password } = data;
      await registerUser({ name, email, password });
      const { displayName, email: userEmail, photoURL } = auth.currentUser;
      dispatch(registerUserAction({ displayName, userEmail, photoURL }));

      if (userEmail) setLoading(false);
      history.replace(from);
      toast.dark(` ${displayName} is registered in our system`);
    } catch (error) {
      // dekha jak ki korte pari
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('email is already taken');
      }
      setLoading(false);
    }
  };

  return (
    <div className={classes.banner}>
      <Box m={12} />
      <MainContainer>
        <Typography color='secondary' component='h2' variant='h5'>
          <Grid container direction='row' alignItems='center'>
            <ExitToApp />
            <span className={classes.margin}>
              {!loading ? (
                'Sign Up'
              ) : (
                <>
                  <ScaleLoader
                    loading={loading}
                    color='rgb(75, 85, 99)'
                    size={15}
                  />
                </>
              )}
            </span>
          </Grid>
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            ref={register}
            type='text'
            name='name'
            label='Name'
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <Input
            ref={register}
            type='text'
            name='email'
            label='Email'
            error={!!errors.email}
            helperText={errors?.email?.message}
          />

          <Input
            ref={register}
            type='password'
            name='password'
            label='password'
            error={!!errors.password}
            helperText={errors?.password?.message}
          />

          <Input
            ref={register}
            type='password'
            name='confirmPassword'
            label='Confirm Password'
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message}
          />
          <PrimaryButton color='secondary' type='submit'>
            Sign Up
          </PrimaryButton>
          <DividerWithText>Or sign in</DividerWithText>

          <PrimaryButton onClick={() => history.push('/login')} type='submit'>
            Sign In
          </PrimaryButton>
        </Form>
      </MainContainer>
    </div>
  );
};

export default SignUp;
