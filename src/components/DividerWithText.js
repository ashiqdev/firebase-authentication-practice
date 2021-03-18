import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  border: {
    borderBottom: "1px solid #A8A8A8",
    width: "100%"
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontWeight: 500,
    fontSize: 16,
    width: "50%",
    color: "#787878"
  }
}));

const DividerWithText = ({ children }) => {
 const classes = useStyles();
 return (
  <div className={classes.container}>
    <div className={classes.border} />
    <span className={classes.content}>{children}</span>
    <div className={classes.border} />
  </div>
 );
};
export default DividerWithText;