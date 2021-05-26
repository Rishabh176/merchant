import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container:{
      padding: "50px 100px",
    },
    toggleButton:{
      transform: "scale(2.5);",
    },
    rowTitle:{
      fontSize: 18,
      fontWeight: "bold"
    },
    nameCell:{
      display: "flex",
      flexDirection: "row",
    },
    avatar: {
      marginRight: "30px",
    },
    name: {
      marginTop: "8px",
    },
    row:{
      cursor: "pointer",
    }
  }),
);
