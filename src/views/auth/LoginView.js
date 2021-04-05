/* eslint-disable */
import React from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import GoogleLogin from './GoogleLogin';
import FacebookLogin from './FacebookLogin';
import { loginStyles } from './styles';
import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { authActions } from '../../redux';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
    padding: theme.spacing.unit * 6
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

const LoginView = () => {
  const classes = loginStyles();
  const classes2 = useStyles();
  const dispatch = useDispatch();
  const { loading, success } = useSelector(state => state.auth);
  if (!loading && success) return <Navigate to="/app/account" />;
  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Card className={classes2.root} boxShadow={3}>
            <Box width={1 / 2} height="50%" style={{ margin: 'auto' }}>
              <img src="./static/images/naplozz01.png" width="100%" />
            </Box>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                password: Yup.string()
                  .max(255)
                  .required('Password is required')
              })}
              onSubmit={user => {
                dispatch(authActions.signIn(user));
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  {/* <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                      className={classes.typographySignin}
                    >
                      Sign in
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Sign in on the internal platform
                    </Typography>
                  </Box> */}
                  {/* <Box mt={3} mb={1}>
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      or login with email address
                    </Typography>
                  </Box> */}
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={loading}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      className={classes.signInbutton}
                    >
                      Sign in now
                    </Button>
                  </Box>
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '5px'
                    }}
                  >
                    OR
                  </span>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <GoogleLogin />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FacebookLogin />
                    </Grid>
                  </Grid>
                  <Box p={2}>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                      className={classes.loginsubtitle}
                    >
                      <span>
                        Don&apos;t have an account?{' '}
                        <Link
                          component={RouterLink}
                          to="/register"
                          variant="h6"
                          style={{ color: '#0859E6' }}
                        >
                          Sign up
                        </Link>
                      </span>
                      <Link
                        component={RouterLink}
                        to="/forgotPassword"
                        variant="h6"
                        align="right"
                        style={{ color: '#0859E6' }}
                      >
                        Forgot Password
                      </Link>
                    </Typography>
                  </Box>
                </form>
              )}
            </Formik>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
