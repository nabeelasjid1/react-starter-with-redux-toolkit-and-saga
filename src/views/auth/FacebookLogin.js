/* eslint-disable */
import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from 'src/icons/Facebook';
import { loginStyles } from './styles';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux';

const FacebookSignIn = () => {
  const dispatch = useDispatch();
  const classes = loginStyles();
  const { loading, success } = useSelector(state => state.auth);
  const responseFacebook = response => {
    dispatch(
      authActions.facebookSignIn({
        accessToken: response.accessToken,
        userId: response.id
      })
    );
  };
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      autoLoad={false}
      callback={responseFacebook}
      render={renderProps => (
        <Button
          color="primary"
          fullWidth
          className={classes.signInbutton}
          startIcon={<FacebookIcon />}
          disabled={loading}
          onClick={renderProps.onClick}
          size="large"
          variant="contained"
          style={{ backgroundColor: '#3b5998' }}
        >
          Login with Facebook
        </Button>
      )}
    />
  );
};

export default FacebookSignIn;
