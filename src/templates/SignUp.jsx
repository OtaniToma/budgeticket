import React, { useCallback } from "react";
import { signUp } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
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
  if (values.password.length <= 5) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'The password and confirm password fields do not match.';
  }
  return errors;
}

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUp = () => {
  const dispatch = useDispatch();

  const onSubmit = useCallback((values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      dispatch(signUp(values.username, values.email, values.password, values.confirmPassword));
    }, 500)
  }, [dispatch]
  );

  const toSignIn = useCallback(() => dispatch(push('/signin')), [dispatch]);

  return (
    <>
      <Paper elevation={3}>
        <Box p={2} bgcolor="background.paper">
          <h2>Sign Up</h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Field
                  component={TextField}
                  name="username"
                  type="username"
                  label="Username"
                  fullWidth={true}
                  multiline={false}
                  required={true}
                  rows={1}
                />
                <Box p={1} bgcolor="background.paper" />
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
                <Box p={1} bgcolor="background.paper" />
                <Field
                  component={TextField}
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
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
        </Box>
      </Paper>
      &nbsp;
      <p onClick={toSignIn}>Already have an account? Sign in</p>
    </>
  );
};

export default SignUp;