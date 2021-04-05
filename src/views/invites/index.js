/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container
} from '@material-ui/core';
import {indexInviteStyles} from './styles'
import Page from 'src/components/Page'
import Toolbar from './Toolbar';
import {
  useDispatch, useSelector
} from 'react-redux';
import { siteActions, inviteActions } from '../../redux';
import UsersData from './UsersData'
import InviteUserViewModal from './InviteUserView'

const invites = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(siteActions.getSites())
    dispatch(inviteActions.getInvites())
  }, [])
  const { sites } = useSelector((state) => state.site);
  const { invites, loading } = useSelector((state) => state.invite);
  const classes = indexInviteStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Page className={classes.root} title="Invite Users">
      <Container maxWidth={false}>
        <Toolbar handleOpen={handleOpen} />
        <InviteUserViewModal open={open} handleClose={handleClose} sites={sites && sites} />
        <Box mt={3}>
          <UsersData invites={invites && invites} loading={loading} sites={sites && sites} />

        </Box>
      </Container>
    </Page>
  )
}

export default invites
