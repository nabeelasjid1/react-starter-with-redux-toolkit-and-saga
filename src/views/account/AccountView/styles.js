/* eslint-disable */
import { makeStyles } from '@material-ui/core';

const indexAccountStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const profileStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  button: {
    color: '#0859E6'
  }
}));

export { indexAccountStyles, profileStyles };
