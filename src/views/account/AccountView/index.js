/* eslint-disable */
import React, { useState} from 'react';
import {
  Container,
  Grid
} from '@material-ui/core';
import {indexAccountStyles} from './styles'
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { useSelector } from 'react-redux';

const Account = () => {
  const { user } = useSelector((state) => state.auth)
  const classes = indexAccountStyles();
  const [imageFile, setImage] = useState(undefined)

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile user={user&&user} setImage={setImage}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails user={user&&user} imageFile={imageFile && imageFile} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
