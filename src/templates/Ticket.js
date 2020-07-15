import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
  }
});

const Ticket = (props) => {
  const {
    quotes
  } = props;

  const classes = useStyles();

  return (
    <>
      {quotes &&
        quotes.map((quote) => {
          return (
            <Card className={classes.root} key={quote.QuoteId}>
              <CardContent>
                {quote.MinPrice}
              </CardContent>
            </Card>
          )
        })
      }
    </>
  );
};

export default Ticket;
