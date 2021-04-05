/* eslint-disable */
import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {landingPageStyles} from './styles'
import {
    Box,
    Button,
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
import { decodeToken, Constants } from '../../utils'

const InviteLandingView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const classes = landingPageStyles();
    const { loading, success, } = useSelector((state) => state.auth);
    const navigateTo = () => {
        const data = decodeToken(token);
        if (data.role === Constants.roles[0].key || data.role === Constants.roles[1].key) {
            navigate('/login', { replace: true });
        } else {
            navigate('/success', { replace: true });
        }
    }
    if (!loading && success) {
        navigateTo();
    }
        return (
            <Page
                className={classes.root}
                title="Set Up Your Profile"
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
                                password: '',
                                confirmPassword: ''
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    password: Yup.string().max(255).required('password is required'),
                                    confirmPassword: Yup.string().when("password", {
                                        is: val => (val && val.length > 0 ? true : false),
                                        then: Yup.string().oneOf(
                                            [Yup.ref("password")],
                                            "Password did not match"
                                        ).required('please confirm your password')
                                    })
                                })
                            }
                            onSubmit={(user) => {
                                dispatch(authActions.setupAccount({ token, password: user.password }));
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
                                            Complete Your Account
                  </Typography>
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                            variant="body2"
                                        >
                                            please set up password for your account
                  </Typography>
                                    </Box>
                                    <TextField
                                        error={Boolean(touched.password && errors.password)}
                                        fullWidth
                                        helperText={touched.password && errors.password}
                                        label="Enter new password"
                                        type="password"
                                        margin="normal"
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                        fullWidth
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                        label="Confirm password"
                                        margin="normal"
                                        name="confirmPassword"
                                        type="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
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
                                            Submit
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

    export default InviteLandingView;
