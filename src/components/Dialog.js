/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteDialog({visible = false, handleClose, handleYes ,data,text}) {

  return (
    <div>
      <Dialog
        open={visible}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
           <DialogTitle id="alert-dialog-title">{text?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" >
          {text?.subTitle}<span style={{color:"white"}}>want to delete this site?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleYes(data)} color="primary">
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
