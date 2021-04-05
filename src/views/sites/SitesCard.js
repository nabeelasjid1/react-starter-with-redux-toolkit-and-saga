/* eslint-disable */
import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import {sitesCardStyles} from './styles'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from './Dialoag'
import UpdateSiteModal from './UpdateSiteView'
import {siteActions} from '../../redux';
import {
  useDispatch
} from 'react-redux';

const SitesCard = ({ className, site,handleOpen, ...rest }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openUpdate, setopenUpdate] = useState(false);
    const handleClose =()=>{
        setOpen(false)
    }
    const handleCloseUpdate = ()=>{
      setopenUpdate(false)
    }
  const handleYes = (site)=>{
    dispatch(siteActions.updateSite({id: site._id, site: {deleted: true}}));
    handleClose()
  }
  
    const classes = sitesCardStyles();
    return (
        <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}

        >
          <Avatar
            alt="site"
            src={site.logo?site.logo:'/static/images/products/product_1.png'}
            variant="square"
            className={classes.logoStyle}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {site.name}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
        {site.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
      <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <EditIcon className={classes.statsIcon} color="action" style={{ cursor: 'pointer' }}
            onClick={()=>setopenUpdate(true)}
            />
            <UpdateSiteModal  openUpdate={openUpdate} handleCloseUpdate={handleCloseUpdate} site={site} />
          </Grid>
          <Grid className={classes.statsItem} item>
            <DeleteIcon
              className={classes.statsIcon}
              style={{ cursor: 'pointer' }}
              color="action"
              onClick={()=>setOpen(true)}
              
            />
            <Dialog open={open} handleClose={handleClose} handleYes={handleYes} site={site} />
          </Grid>
        </Grid>
      </Box>
    </Card>
    )
}

export default SitesCard
