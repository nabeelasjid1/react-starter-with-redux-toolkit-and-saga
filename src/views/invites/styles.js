/* eslint-disable */
import { makeStyles } from '@material-ui/core';
import { Underline } from 'react-feather';

const indexInviteStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  siteCard: {
    height: '100%'
  }
}));
const inviteUserViewStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '50%'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 4, 3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const inviteToolbarStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));
const userDataStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  noInviteWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  noInvite: {
    color: 'gray',
    margin: theme.spacing(2),
    width: '100%'
  },
  typography: {
    padding: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },

  inviteStatus: { background: '#b3eacc', borderRadius: '5px', padding: '5px' }
}));

export {
  indexInviteStyles,
  inviteUserViewStyles,
  inviteToolbarStyles,
  userDataStyles
};
