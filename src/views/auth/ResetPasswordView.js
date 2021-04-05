/* eslint-disable */
import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { restPasswordStyles } from './styles';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux';

const VerifyAccountView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = restPasswordStyles();
  const { loading, success, token } = useSelector(state => state.auth);
  if ((!loading && success) || token) {
    navigate('/login', { replace: true });
  }

  return (
    <Page className={classes.root} title="Verification Email">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              token: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
              token: Yup.string()
                .max(255)
                .required('Verification Code is required'),
              password: Yup.string()
                .max(255)
                .required('password is required'),
              confirmPassword: Yup.string().when('password', {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                  [Yup.ref('password')],
                  'Password did not match'
                )
              })
            })}
            onSubmit={user => {
              dispatch(
                authActions.resetPassword({
                  token: user.token,
                  password: user.password
                })
              );
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
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Reset Your Account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    please set new password for your account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.token && errors.token)}
                  fullWidth
                  helperText={touched.token && errors.token}
                  label="Enter reset account code "
                  margin="normal"
                  name="token"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Enter new password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  label="Confirm password"
                  margin="normal"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
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
                    className={classes.resetbutton}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default VerifyAccountView;
