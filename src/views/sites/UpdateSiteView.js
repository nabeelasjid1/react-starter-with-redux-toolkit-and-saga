/* eslint-disable */
import React, { useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {updateSiteViewStyles} from './styles'
import {
  useDispatch
} from 'react-redux';
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

const UpdateModal=({openUpdate,handleCloseUpdate,site})=> {
  const classes = updateSiteViewStyles();
  const [imageFile, setImage] = useState(undefined)
  const dispatch = useDispatch();
  const handleChangeFile= (files)=>{
    setImage(files[0])
      }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openUpdate}
        onClose={handleCloseUpdate}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openUpdate}>
          <Box className={classes.paper}>   
            <Container maxWidth="sm">
          <Formik
            initialValues={{
              name: site? site.name:'',
              description: site? site.description:'',
            }}
            validationSchema={
              Yup.object().shape({
                
                name: Yup.string().max(255).required('Name is required'),
                description: Yup.string().max(255).required('Description is required'),
                
              })
            }
            onSubmit={(value) => {
                dispatch(siteActions.updateSite({id: site._id, site: value}));
                handleCloseUpdate()
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
                    Update Site
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    you can Update your workspace
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
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Update site
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

export default UpdateModal
