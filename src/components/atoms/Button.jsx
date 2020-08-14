import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  button: {
    fontSize: 16,
  },
});

const PrimaryButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant={props.variant || "contained"}
      size={props.size || "medium"}
      color={props.color}
      onClick={() => props.onClick()}
      disabled={props.disabled || false}
      width={props.width || classes.button.width}
      startIcon={props.startIcon || false}
      endIcon={props.endIcon || false}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
