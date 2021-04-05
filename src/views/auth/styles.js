/* eslint-disable */
import { makeStyles } from '@material-ui/core';

const root = theme => {
  return {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  };
};

const loginStyles = makeStyles(theme => ({
  root: root(theme),
  loginsubtitle: { display: 'flex', justifyContent: 'space-between' },
  typographySignin: {
    textAlign: 'center'
  },
  signInbutton: {
    padding: theme.spacing.unit * 2
  }
}));
const registerStyles = makeStyles(theme => ({
  root: root(theme),

  signUpbutton: {
    padding: theme.spacing.unit * 2
  }
}));

const restPasswordStyles = makeStyles(theme => ({
  root: root(theme),

  resetbutton: {
    padding: theme.spacing.unit * 2
  }
}));
const landingPageStyles = makeStyles(theme => ({
  root: root(theme)
}));

const forgotPasswordStyles = makeStyles(theme => ({
  root: root(theme),

  forgotbutton: {
    padding: theme.spacing.unit * 2
  }
}));

const successViewStyles = makeStyles(theme => ({
  root: root(theme),
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  },
  grid: {
    padding: theme.spacing(4)
  },
  buttons: {
    margin: theme.spacing(2)
  },
  text: {
    padding: theme.spacing(4)
  }
}));

const verifyViewStyles = makeStyles(theme => ({
  root: root(theme)
}));

export {
  loginStyles,
  registerStyles,
  restPasswordStyles,
  landingPageStyles,
  forgotPasswordStyles,
  successViewStyles,
  verifyViewStyles
};
