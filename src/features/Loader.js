import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useStyles } from "./styles";

function Loader (){

    /** custom hooks */
    const classes = useStyles();

    return (
        <CircularProgress className={classes.root}/>
    );
}

export default Loader;