/* eslint-disable */
import React, { useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { toast } from 'react-toastify';
import {createSiteViewStyles} from './styles'
import {
  useDispatch
} from 'react-redux'
import {siteActions} from '../../redux'
import Fade from '@material-ui/core/Fade';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  
} from '@material-ui/core';
import Dropzone from './Dropzone'

const ModalComp=({open,handleClose})=> {
  const [imageFile, setImage] = useState(undefined)
  const [fileUploadLoading, setFileUplodLoading] = useState(false)

  const classes = createSiteViewStyles();
  const dispatch = useDispatch();

  const handleChangeFile= (files)=>{
setImage(files[0])
  }
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
          dispatch(siteActions.createSite({...value, logo:data.Location}));
          handleClose()
        }
      });
    });
    
  }
  //img upload end

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
              name: '',
              description: '',
            }}
            validationSchema={
              Yup.object().shape({
                
                name: Yup.string().max(255).required('Name is required'),
                description: Yup.string().max(255).required('Description is required'),
                
              })
            }
            onSubmit={async (value) => {
              if (imageFile === undefined)
                return toast.error('Please Upload Logo Image');
                   uploadImage(imageFile, value);
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
                <Box mb={3} style={{textAlign:"center"}}>
                <Typography
                    gutterBottom
                    variant="body2"
                    style={{color:"white"}}
                    
                  >
                    
          you can add your sites by adding their detail, Please add sites data carefully. 
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    
                  >
                    Add Site
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    you can add your workspace
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
                <Dropzone handleChangeFile={handleChangeFile} />
                <TextField
                  error={Boolean(touched.description && errors.description)}
                  rows={10}
                  className={classes.textarea}
                  helperText={touched.description && errors.description}
                  label="description"
                  placeholder='Add Your Description'
                  margin="normal"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  variant="outlined"
                />
                
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={false}
                    fullWidth
                    disabled={fileUploadLoading}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add site
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

export default ModalComp
