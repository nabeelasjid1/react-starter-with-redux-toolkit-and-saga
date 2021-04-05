/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {indexStyles} from './styles'
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import SitesCard from './SitesCard'
import CreateSiteModal from './CreateSiteView'
import {
  useDispatch, useSelector
} from 'react-redux';
import { siteActions } from '../../redux';

const sites = () => {
  const dispatch = useDispatch();
  const { sites, loading, success } = useSelector((state) => state.site);
  useEffect(() => {
    dispatch(siteActions.getSites())
  }, [])

  const classes = indexStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Page className={classes.root} title="Sites">
      <Container maxWidth={false}>
        <Toolbar handleOpen={handleOpen} />
        <CreateSiteModal open={open} handleClose={handleClose} />

        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >

            {sites?.[0] ? sites.map((site) => {
              if (site.deleted) return
              return (
                <Grid
                  item
                  key={site._id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  {<SitesCard
                    className={classes.siteCard}
                    site={site}
                    handleOpen={handleOpen}
                  />}


                </Grid>
              )
            }
            )
              : !loading && <h2 className={classes.notfound}><FormattedMessage id="sites.noSiteFound" /></h2>
            }
            {loading && <Box width="100%" style={{ textAlign: "center", margin: "10px" }}><CircularProgress disableShrink /></Box>}
          </Grid>
        </Box>
      </Container>
    </Page>
  )
}
export default sites
