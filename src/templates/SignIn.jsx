import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import {signIn} from '../reducks/users/operations';
import Box from '@material-ui/core/Box';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {Button, LinearProgress} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const initialValues = {
  email: 'budgeticket@gmail.com',
  password: 'foobar',
};

const SignIn = () => {
  const dispatch = useDispatch();

  const onSubmit = useCallback((values, {setSubmitting}) => {
    setTimeout(() => {
      setSubmitting(false);
      dispatch(signIn(values.email, values.password));
    }, 500);
  }, [dispatch],
  );

  const toSignUp = useCallback(() => dispatch(push('/signup')), [dispatch]);
  const toReset = useCallback(() => dispatch(push('/reset')), [dispatch]);

  return (
    <>
      <Paper elevation={3}>
        <Box p={2} bgcolor="background.paper">
          <h2>Sign In</h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({submitForm, isSubmitting}) => (
              <Form>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth={true}
                  multiline={false}
                  required={true}
                  rows={1}
                />
                <Box p={1} bgcolor="background.paper" />
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  fullWidth={true}
                  multiline={false}
                  required={true}
                  rows={1}
                />
                {isSubmitting && <LinearProgress />}
                <Box p={1} bgcolor="background.paper" />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <Box mt={3}>
            <Typography align="center">
              <Link href="/signup" onClick={toSignUp} color="primary">
                Create new account
              </Link>
            </Typography>
            <Typography align="center">
              <Link href="/reset" onClick={toReset} color="primary">
                Reset password
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default SignIn;
