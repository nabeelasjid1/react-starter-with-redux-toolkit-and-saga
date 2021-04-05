/* eslint-disable */
import React, { useEffect } from 'react';
import { Link as RouterLink,Navigate} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {verifyViewStyles} from "./styles"
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import {
    useDispatch, useSelector
} from 'react-redux';
import { authActions } from '../../redux';

const VerifyAccountView = () => {
    const dispatch = useDispatch();
    const classes = verifyViewStyles();
    const { loading, success, token } = useSelector((state) => state.auth);
    if ((!loading && success)) return <Navigate to="/login" />;

    return (
        <Page
            className={classes.root}
            title="Verification Email"
        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                          token :''
                        }}
                        validationSchema={
                            Yup.object().shape({
                                token: Yup.string().max(255).required('Verification Code is required'),
                            })
                        }
                        onSubmit={(token) => {
                            dispatch(authActions.verifyEmail(token));
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
                                <Box mb={3}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h2"
                                    >
                                        Verify Your Account
                  </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        please enter code here to verify your account
                  </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(touched.lastName && errors.lastName)}
                                    fullWidth
                                    helperText={touched.lastName && errors.lastName}
                                    label="verification code"
                                    margin="normal"
                                    name="token"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.token}
                                    variant="outlined"
                                />
                                <Box my={2}>
                                    <Button
                                        color="primary"
                                        disabled={loading}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Verify Account
                  </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </Page>
    );
};

export default VerifyAccountView;
