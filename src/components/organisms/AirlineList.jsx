import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));

const AirlineList = ({ carriers, filterAirlines }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  // console.log(checked);

  const handleToggle = (carrier) => () => {
    const currentIndex = checked.indexOf(carrier);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(carrier);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    filterAirlines(checked)
  }, [checked])

  return (
    <>
      <List className={classes.root}>
      {carriers.map((carrier) => {
        const labelId = `checkbox-list-label-${carrier.CarrierId}`;

        return (
          <ListItem key={carrier.CarrierId} role={undefined} dense button onClick={handleToggle(carrier)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(carrier) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={carrier.Name} />
          </ListItem>
        );
      })}
    </List>
  </>
  );
};

export default AirlineList;
