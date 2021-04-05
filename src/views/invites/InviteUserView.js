/* eslint-disable */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Constants } from '../../utils'
import {inviteUserViewStyles} from './styles'
import Fade from '@material-ui/core/Fade';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { inviteActions } from '../../redux';
import {
  useDispatch, useSelector
} from 'react-redux';

const InviteUserModal = ({ open, handleClose, sites }) => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.invite);
  const [flag, setFlag] = useState(false)
  const classes = inviteUserViewStyles();
  if (!loading && success) { handleClose(false) }
  const customFunction = (e, handleChange) => {
    handleChange(e)
    e.target.value === 'leader' ? setFlag(false) : setFlag(true)
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.paper}>
            <Container maxWidth="sm">
              <Formik
                initialValues={{
                  email: '',
                  firstName: '',
                  lastName: '',
                  site: '',
                  role: ''

                }}
                validationSchema={
                  Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    firstName: Yup.string().max(255).required('First name is required'),
                    lastName: Yup.string().max(255).required('Last name is required'),
                    site: flag && Yup.string().max(255).required('site is required'),
                    role: Yup.string().max(255).required('role is required'),

                  })
                }
                onSubmit={(values) => {
                  !flag && delete values['site'];
                  dispatch(inviteActions.sendInvite(values));
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  touched,
                  values
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box mb={3} style={{ textAlign: "center" }}>
                      <Typography
                        color="textPrimary"
                        variant="h2"

                      >
                        Invite User
                  </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        You can Add New User and Set Roles
                  </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        style={{ color: "white" }}

                      >
                        you can invite yours by adding their detail, Please add user email and site carefully.
                  </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.firstName && errors.firstName)}
                      fullWidth
                      helperText={touched.firstName && errors.firstName}
                      label="First name"
                      margin="normal"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      label="Last name"
                      margin="normal"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      variant="outlined"
                    />


                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.role && errors.role)}
                      fullWidth
                      helperText={touched.role && errors.role}
                      label="Add role"
                      margin="normal"
                      name="role"
                      select
                      onBlur={handleBlur}
                      onChange={(e) => customFunction(e, handleChange)}
                      type="select"
                      value={values.role}
                      variant="outlined"
                    >
                      {Constants.rolesDropdown.map(role => (
                        <MenuItem key={role.key} value={role.key}>
                          {role.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    {flag &&
                      <TextField
                        error={Boolean(touched.site && errors.site)}
                        fullWidth
                        helperText={touched.site && errors.site}
                        label="Add site"
                        margin="normal"
                        name="site"
                        disabled={!flag}
                        select
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="select"
                        value={flag ? values.site : ''}
                        variant="outlined"
                      >

                        {sites && sites.map(site => (
                          <MenuItem key={site._id} value={site._id}>
                            { site.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    }

                    <Box my={2}>
                      <Button
                        color="primary"
                        disabled={loading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Invite User
                  </Button>
                    </Box>

                  </form>
                )}
              </Formik>

            </Container>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default InviteUserModal
