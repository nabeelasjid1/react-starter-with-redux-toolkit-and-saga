/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { authActions } from '../../../redux'
import {
  useDispatch, useSelector
} from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField

} from '@material-ui/core';


const Password = ({ className, ...rest }) => {
  
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.auth);

  return (
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <Formik
            initialValues={{
              currentPassword: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={
              Yup.object().shape({
                currentPassword: Yup.string().max(255).required('Current password is required'),
                password: Yup.string().max(255).required('password is required'),
                confirmPassword: Yup.string().when('password', {
                  is: (val) => (!!(val && val.length > 0)),
                  then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    'Password did not match'
                  ).required('Please confirm your password'),
                })
              })
            }
            onSubmit={(value) => {
              dispatch(authActions.updatePassword({ password:value.currentPassword,newPassword:value.password}));
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
             
                <TextField
                  error={Boolean(touched.currentPassword && errors.currentPassword)}
                  fullWidth
                  helperText={touched.currentPassword && errors.currentPassword}
                  label="Enter current password"
                  margin="normal"
                  name="currentPassword"
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
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
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
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  my={2}>
                  <Button
                    color="primary"
                    disabled={false}
                    size="large"
                    disabled={loading}
                    type="submit"
                    variant="contained"
                  >
                    Update Passwor
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          {loading && <Box width="100%" style={{textAlign:"center",margin:"10px"}}><CircularProgress disableShrink /></Box> }
        </CardContent>

      </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
