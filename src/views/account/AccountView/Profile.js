/* eslint-disable */
import React, { useState } from 'react';
import clsx from 'clsx';
import { profileStyles } from './styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  FormControl,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

const Profile = ({ className, user, setImage, ...rest }) => {
  const classes = profileStyles();
  const [file, setFile] = useState(undefined);
  const handleChange = event => {
    setFile(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar
            className={classes.avatar}
            src={
              file
                ? file
                : user?.avatar
                ? user.avatar
                : '/static/images/avatars/user.png'
            }
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {user?.role}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          ></Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions style={{ display: 'grid' }}>
        <FormControl className={classes.formControl}>
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleChange}
          />
          {/* preview of file */}
          <label htmlFor="raised-button-file">
            <Button
              color="primary"
              fullWidth
              variant="raised"
              component="span"
              className={classes.button}
            >
              Update Photo
            </Button>
          </label>
        </FormControl>
      </CardActions>
    </Card>
  );
};

export default Profile;
