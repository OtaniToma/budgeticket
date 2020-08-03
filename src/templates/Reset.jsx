import React, { useCallback, useState } from "react";
import { TextInput, Button } from "../components/atoms";
import { resetPassword } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Box from '@material-ui/core/Box';

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  return (
    <>
      <h2>Reset Password</h2>
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
      <Box p={1} bgcolor="background.paper" />
      <Button
        label={"Reset"}
        color="primary"
        onClick={() => dispatch(resetPassword(email))}
      />
      <p onClick={() => dispatch(push("/signin"))}>Back to Sign In</p>
    </>
  );
};

export default Reset;
