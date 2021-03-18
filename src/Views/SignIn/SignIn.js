import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import Form from '../../components/Form';
import Input from '../../components/Input';
import MainContainer from '../../components/MainContainer';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import banner from '../../images/signup-bg.png';
import PrimaryButton from '../../components/PrimaryButton';
import DividerWithText from '../../components/DividerWithText';
import { LockOpen } from '@material-ui/icons';
import { handleSocialSignIn, signinUser } from '../../utils/firebaseManager';
import { useContext, useEffect, useState } from 'react';
import { store } from '../../store/store';
import { registerUserAction } from '../../store/action/actions';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { auth } from '../../utils/firebase.config';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  banner: {
    position: 'relative',
    color: '#fff',
    marginTop: '60px',
    padding: '0',
    backgroundImage: ` url(${banner})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },

  margin: {
    marginLeft: '1rem',
  },
}));

const schema = yup.object().shape({
  email: yup.string().required('Email is a required field'),

  password: yup.string().required('Password is a required field'),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
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
      const { email, password } = data;
      const res = await signinUser(email, password);
      const { displayName, email: userEmail, photoURL } = res;

      dispatch(registerUserAction({ displayName, userEmail, photoURL }));
      if (displayName) setLoading(false);
      history.replace(from);
      toast.dark(` ${displayName} is singned in our system`);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const socialSignIn = async (media) => {
    try {
      setLoading(true);
      const user = await handleSocialSignIn(media);
      dispatch(registerUserAction(user));
      if (user.displayName) setLoading(false);
      history.replace(from);
      toast.dark(` ${user.displayName} is signed in our system`);
    } catch (error) {
      console.log({ error });
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast.error(`${error.email} is already taken`);
      }
      setLoading(false);
    }
  };

  // {user?.displayName && <Redirect to="/"/>}
  // if (auth.currentUser) {

  //   <Redirect to='/' />;
  // }

  console.log(auth.currentUser);

  useEffect(() => {
    console.log({from});
    if (user?.displayName) {
      history.replace(from);
    }
  }, [user]);

  return (
    <div className={classes.banner}>
      <Box m={12} />
      <MainContainer>
        <Typography color='secondary' component='h2' variant='h5'>
          <Grid container direction='row' alignItems='center'>
            <LockOpen />{' '}
            <span className={classes.margin}>
              {!loading ? (
                'Sign In'
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

        <PrimaryButton
          onClick={() => socialSignIn('google')}
          style={{ backgroundColor: '#DB4437', color: '#FFF' }}
        >
          Login With Google
        </PrimaryButton>
        <PrimaryButton
          onClick={() => socialSignIn('facebook')}
          style={{ backgroundColor: '#3b5998', color: '#FFFF' }}
        >
          Login With Facebook
        </PrimaryButton>
        <PrimaryButton
          onClick={() => socialSignIn('github')}
          style={{ backgroundColor: '#f5f5f5', color: '#333' }}
        >
          Login With Github
        </PrimaryButton>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <DividerWithText>Or sign in with email</DividerWithText>
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
            label='Password'
            error={!!errors.password}
            helperText={errors?.password?.message}
          />

          <PrimaryButton color='secondary' type='submit'>
            Sign In
          </PrimaryButton>

          <DividerWithText>Or sign up</DividerWithText>

          <PrimaryButton
            onClick={() => history.push('/register')}
            type='submit'
          >
            Sign Up
          </PrimaryButton>
        </Form>
      </MainContainer>
    </div>
  );
};

export default SignIn;
