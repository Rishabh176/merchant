import React, { memo, useEffect, useState } from 'react';
import { Box, Paper, Table, TableHead, TableBody, TableCell, TableRow, Chip, Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { BASE_URL } from '../../utils/constant';
import Loader from '../../features/Loader';
import { useStyles } from "./styles";

const Merchant = memo((props) => {

    const id = props.match.params.id;  //extracting id from URL
    const classes = useStyles();

    /**  useState hooks */
    const [loading, setLoading] = useState(true);
    const [merchantData, setData] = useState([]);

    useEffect(() => {
        fetchMerchantdata();
    }, []);

    const fetchMerchantdata = () => {
        //Api call
        axios.get(BASE_URL + id, {})
            .then((response) => {
                setData(response.data)
                setLoading(false);
            })
            .catch((error) => {
                alert(error);
                setLoading(false);
            });
    }

    console.log("data--->", merchantData);
    const { bids } = merchantData;
    console.log("bids--->", bids);

    if (loading) {
        return <Loader />;
    }
    else {
        return (
            <Box className={classes.container}>
                <Box className={classes.top}>
                    <Box>
                        <img src={merchantData?.avatarUrl} className={classes.image} />
                    </Box>
                    <Box className={classes.merchantInfo}>
                        {
                            merchantData?.hasPremium === true ? 
                            <Chip 
                                size="small"
                                icon={<Star />}
                                label="Premium"
                                color="secondary"
                                className={classes.root}
                            /> : null
                        }
                        <Typography variant="h5" className={classes.padding}>{merchantData?.firstname + ' ' + merchantData?.lastname}</Typography>
                        <Typography variant="h6" className={classes.padding}>{merchantData?.email}</Typography>
                        <Typography variant="h6" className={classes.padding}>{merchantData?.phone}</Typography>
                    </Box>             
                </Box>
                <Paper className={classes.bottom}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.rowTitle}>Car</TableCell>
                                <TableCell className={classes.rowTitle}>Amount</TableCell>
                                <TableCell className={classes.rowTitle}>Created</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                bids.length > 0 && bids.map((bid) => {
                                    var date = new Date(bid.created * 1000); 
                                    var formattedTime = date.toLocaleString();
                                    return (
                                        <TableRow key={bid.id}>
                                            <TableCell className={classes.cell}>{bid.carTitle}</TableCell>
                                            <TableCell className={classes.cell}>{bid.amount}</TableCell>
                                            <TableCell className={classes.cell}>{formattedTime}</TableCell>
                                        </TableRow>
                                    );
                                }) 
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        );
    }
})

export default withRouter(Merchant);
