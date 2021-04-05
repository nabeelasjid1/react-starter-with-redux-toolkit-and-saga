/* eslint-disable */
import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '../../components/index';
import { userDataStyles } from './styles';
import UpdatUserView from './UpdateUserView';
import { inviteActions } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  Table,
  Button,
  Popover,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';

const UsersData = ({ className, invites, sites, loading, ...rest }) => {
  const classes = userDataStyles();
  const dispatch = useDispatch();

  // DElete Modal
  let textDetail = {
    title: 'Delete User',
    subTitle: 'Are you sure you want to delete this User?'
  };
  const [visible, setvisible] = useState(false);
  const handleCloseDialog = () => {
    setvisible(false);
  };
  const handleYes = data => {
    dispatch(
      inviteActions.updateInvite({ id: data._id, user: { deleted: true } })
    );
    handleCloseDialog();
  };
  // DElete Modal End

  // popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // popoverend

  // Update Modal
  const [openUpdate, setopenUpdate] = useState(false);
  const handleCloseUpdate = () => {
    setopenUpdate(false);
  };
  // Update Modal end

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>{/* Phone */}</TableCell>
                <TableCell>InviteStatus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invites?.[0]
                ? invites.map(invite => (
                    <TableRow hover key={invite._id}>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Avatar
                            className={classes.avatar}
                            src="/static/images/avatars/user.png"
                          ></Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {invite.firstName} {invite.lastName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{invite.email}</TableCell>
                      <TableCell>{invite.role}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        {invite.inviteStatus === 'accepted' ? (
                          <span className={classes.inviteStatus}>accepted</span>
                        ) : (
                          <span>Pending</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <h1
                          aria-describedby={id}
                          variant="contained"
                          color=""
                          onClick={event => setAnchorEl(event.currentTarget)}
                          style={{ cursor: 'pointer' }}
                        >
                          ...
                        </h1>
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                          }}
                        >
                          <Typography
                            className={classes.typography}
                            onClick={() => setopenUpdate(true)}
                          >
                            Edit
                          </Typography>
                          <Typography
                            className={classes.typography}
                            onClick={() => setvisible(true)}
                          >
                            Delete
                          </Typography>
                          <Dialog
                            visible={visible}
                            handleClose={handleCloseDialog}
                            handleYes={handleYes}
                            data={invite}
                            text={textDetail}
                          />
                        </Popover>

                        <UpdatUserView
                          invite={invite}
                          sites={sites}
                          open={openUpdate}
                          handleClose={handleCloseUpdate}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : !loading && (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <h3 className={classes.noInvite}>No invites found</h3>
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {loading && (
        <Box width="100%" style={{ textAlign: 'center', margin: '10px' }}>
          <CircularProgress disableShrink />
        </Box>
      )}
    </Card>
  );
};

export default UsersData;
