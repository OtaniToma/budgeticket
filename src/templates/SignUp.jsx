import React from "react";
import { signUp } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'

const SignUp = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Paper elevation={3}>
        <Box p={2} bgcolor="background.paper">
          <h2>Sign Up</h2>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validate={values => {
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
              if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                dispatch(signUp(values.username, values.email, values.password, values.confirmPassword))
              }, 500);
            }}
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
      <p>
        Already have an account?{" "}
        <span onClick={() => dispatch(push("/signin"))}>Sign in</span>
      </p>
    </>
  );
};

export default SignUp;