import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: "100px",
    },
    top: {
      width: 500,
      display: "flex",
      marginBottom: "50px",
      justifyContent: "space-between"
    },
    bottom: {
      width: "100%",
    },
    image: {
      borderRadius: "50%"
    },
    padding: {
      paddingBottom: "8px"
    }, 
    merchantInfo:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center"
    },
    rowTitle:{
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    cell: {
      textAlign: "center",
    }
  }),
);
