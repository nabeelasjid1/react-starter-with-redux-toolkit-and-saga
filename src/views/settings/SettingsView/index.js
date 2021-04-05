/* eslint-disable */
import React from 'react';
import {indexsettingStyles} from './styles'
import {
  Box,
  Container
} from '@material-ui/core';
import Page from 'src/components/Page';
import Password from './Password';

const SettingsView = () => {
  const classes = indexsettingStyles();

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        <Box mt={3}>
          <Password />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;
