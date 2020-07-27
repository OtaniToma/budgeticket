import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  button: {
    fontSize: 16,
    height: 48,
    marginButton: 16,
    width: 150,
  },
});

const PrimaryButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant={props.variant || "contained"}
      color={props.color}
      onClick={() => props.onClick()}
      disabled={props.disabled || false}
      width={props.width || classes.button.width}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
