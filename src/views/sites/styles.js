/* eslint-disable */
import {
    makeStyles
  } from '@material-ui/core';

  const root = (theme)=>{
      return {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
      }
  }
const indexStyles = makeStyles(theme => ({
    root:root(theme),
    siteCard: {
      height: '100%'
    },
    notfound: {
      textAlign: 'center',
      color: 'gray',
      margin: theme.spacing(2),
      width:'100%'
    }
  }));
  const createSiteViewStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth:'50%'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
      padding: theme.spacing(2, 4, 3),
    },
    textarea:{
      width:'100%',
      marginTop:"5px",
      padding:'5px'
  }
  }));
  const dropzoneStyles = makeStyles(() => ({
    previewContainer: {
      container: 'true',
      width: '300%',
      height: '100%',
    },
    preview: {
      width: '100%',
      height: '100%',
      item: 'true',
      marginLeft:'23px',
      xs: '12',
    },
    previewImg: {
      height: '100%',
      width: '100%',
    },
  }));
  const sitesCardStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    statsItem: {
      alignItems: 'center',
      display: 'flex'
    },
    statsIcon: {
      marginRight: theme.spacing(1)
    },
    logoStyle: {
      width: '40%',
      height: '40%',
      resize: 'contain'
    }
  }));
  
const toolbarStyles = makeStyles((theme) => ({
    root: {},
    importButton: {
      marginRight: theme.spacing(1)
    },
    exportButton: {
      marginRight: theme.spacing(1)
    }
  }));
  const updateSiteViewStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth:'50%'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
      padding: theme.spacing(2, 4, 3),
    },
    textarea:{
        width:'100%',
        marginTop:"5px",
        padding:'5px'
    }
  }));
  
  
  
  export {indexStyles,createSiteViewStyles,dropzoneStyles,sitesCardStyles,toolbarStyles,updateSiteViewStyles}