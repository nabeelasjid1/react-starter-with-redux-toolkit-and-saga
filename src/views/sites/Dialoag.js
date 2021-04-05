/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteDialog({open,handleClose, handleYes,site}) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
           <DialogTitle id="alert-dialog-title">{"Delete Site"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" >
          Are you sure you want to delete this site?<span style={{color:"white"}}>want to delete this site?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleYes(site)} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
