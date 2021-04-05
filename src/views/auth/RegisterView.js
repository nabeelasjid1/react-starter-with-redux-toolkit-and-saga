/* eslint-disable */
import React from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { registerStyles } from './styles';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Card,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
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

const RegisterView = () => {
  const dispatch = useDispatch();
  const classes = registerStyles();
  const classes2 = useStyles();
  const { loading, success, token } = useSelector(state => state.auth);
  if (!loading && success) return <Navigate to="/verify" />;

  return (
    <Page className={classes.root} title="Register">
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
                firstName: '',
                lastName: '',
                password: '',
                policy: false
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                firstName: Yup.string()
                  .max(255)
                  .required('First name is required'),
                lastName: Yup.string()
                  .max(255)
                  .required('Last name is required'),
                password: Yup.string()
                  .max(255)
                  .required('password is required'),
                policy: Yup.boolean().oneOf(
                  [true],
                  'This field must be checked'
                )
              })}
              onSubmit={user => {
                dispatch(authActions.signup(user));
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
                  <Box mb={3} style={{ textAlign: 'center' }}>
                    <Typography color="textPrimary" variant="h2">
                      Create new account
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Use your email to create new account
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="First name"
                    margin="normal"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label="Last name"
                    margin="normal"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    variant="outlined"
                  />
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
                  <Box alignItems="center" display="flex" ml={-1}>
                    <Checkbox
                      checked={values.policy}
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography color="textSecondary" variant="body1">
                      I have read the{' '}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6"
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>{errors.policy}</FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={loading}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      className={classes.signUpbutton}
                    >
                      Sign up now
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Have an account?{' '}
                    <Link component={RouterLink} to="/login" variant="h6">
                      Sign in
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
