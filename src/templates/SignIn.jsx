import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signIn } from "../reducks/users/operations";
import { TextInput, Button } from "../components/atoms";
import Box from '@material-ui/core/Box';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  return (
    <div>
      <h2>Sign In</h2>

      <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           const data = JSON.stringify(values, null, 2);
           setEmail(data.email)
           setPassword(data.password)
           setSubmitting(false);
           dispatch(signIn(email, password))
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="email" name="email" />
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" />
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>

      <TextInput
        fullWidth={true}
        label={"Email"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"Password"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <Box p={1} bgcolor="background.paper" />
      <Button
        label={"Sign In"}
        color="primary"
        onClick={() => dispatch(signIn(email, password))}
      />
      <p onClick={() => dispatch(push("/signup"))}>Create new account</p>
      <p onClick={() => dispatch(push("/signin/reset"))}>Reset password</p>
    </div>
  );
};

export default SignIn;
