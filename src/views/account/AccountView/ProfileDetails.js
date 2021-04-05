/* eslint-disable */
import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { authActions } from '../../../redux'
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import {
  useDispatch
} from 'react-redux';


const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className,user, imageFile,...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [fileUploadLoading, setFileUplodLoading] = useState(false)

  // img upload
  const uploadImage=  (image,value)=>{ 
    setFileUplodLoading(true)
    var S3 = require('aws-sdk/clients/s3');
    const s3bucket = new S3({
      accessKeyId: process.env.REACT_APP_ACCESSKEYID,
      secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
      Bucket: 'naplozz',
      signatureVersion: 'v4',
      ACL: 'public-read',
      region: 'eu-central-1',
      successActionStatus: 201,
      keyPrefix: 'images/'
    });
    s3bucket.createBucket(() => {
      const params = {
        Bucket: 'naplozz',
        Key: image.name,
        Body: image,
        ContentType: image.type,
        ACL: 'public-read',
        region: 'eu-central-1',
        successActionStatus: 201,
        keyPrefix: 'images/'
      };
      s3bucket.upload(params, (err, data) => {
        if (err) {
          setFileUplodLoading(false)
          return;
        }
        if (data) {
          
          setFileUplodLoading(false)
          dispatch(authActions.updateProfile({...value, avatar:data.Location}));
          toast('Updateded successfullf');
        }
      });
    });
    
  }
  //img upload end
  return (
<Formik
            initialValues={{
              firstName: user?.firstName,
              lastName: user?.lastName,
              subscription: '',
              role:user?.role
            }}
            validationSchema={
              Yup.object().shape({
                firstName: Yup.string().max(255).required('First Name is required'),
                lastName: Yup.string().max(255).required('Last Name is required'),
                
              })
            }
            onSubmit={(value) => {
              if (imageFile === undefined)
              return dispatch(authActions.updateProfile({  firstName:value.firstName, lastName:value.lastName }))
                let obj ={  firstName:value.firstName, lastName:value.lastName }
                console.log("id is ",user?._id)
                uploadImage(imageFile, obj);
              
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
    
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="First name"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="subscription"
                name="subscription"
                disabled='true'
                onChange={handleChange}
                required
                value={values.subscription}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Role"
                name="role"
                disabled='true'
                onChange={handleChange}
                type="text"
                value={values.role}
                variant="outlined"
              />
              
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
          >
          <Button
            color="primary"
            type="submit"
            variant="contained"
            disabled={fileUploadLoading}
          >
            Save details
          </Button>
        </Box>
        {fileUploadLoading && <Box width="100%" style={{textAlign:"center",margin:"10px"}}><CircularProgress disableShrink /></Box> }
      </Card>
    </form>

  )
}
 </Formik>
  )
}
export default ProfileDetails;
