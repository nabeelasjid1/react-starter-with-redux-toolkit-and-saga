/* eslint-disable */
import React from 'react';
import GoogleLogin from 'react-google-login';
import { Button } from '@material-ui/core';
import { loginStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import GoogleIcon from 'src/icons/Google';
import { authActions } from '../../redux';
import { errorNotification } from '../../utils';

const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const classes = loginStyles();
  const { loading } = useSelector(state => state.auth);

  const responseGoogle = async response => {
    if (response.error) {
      errorNotification({ message: response.detail });
      return;
    } else {
      dispatch(authActions.googleSignIn({ token: response.tokenId }));
    }
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      redirectUri={process.env.REACT_APP_GOOGLE_REDIRECT_URI}
      // scope={`${process.env.GOOGLE_SCOPE}`}
      render={renderProps => (
        <Button
          fullWidth
          startIcon={<GoogleIcon />}
          className={classes.signInbutton}
          disabled={loading}
          onClick={renderProps.onClick}
          size="large"
          variant="contained"
          style={{ backgroundColor: '#fffff' }}
        >
          Login with Google
        </Button>
      )}
    />
  );
};
export default GoogleSignIn;
