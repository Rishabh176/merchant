import React, { memo, useEffect, useState } from 'react';
import { Box, Paper, Table, TableHead, TableBody, TableCell, TableRow, Chip, Typography } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { BASE_URL } from '../../utils/constant';
import Loader from '../../features/Loader';
// import { useStyles } from "./styles";

const Merchant = memo((props) => {

    const id = props.match.params.id;  //extracting id from URL

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
            <Box>
                <Paper>
                    <Box>
                        <img src={merchantData?.avatarUrl} />
                    </Box>
                    <Box>
                        {
                            merchantData?.hasPremium === true ? 
                            <Chip 
                                size="small"
                                icon={<Star />}
                                label="Premium"
                                color="secondary"
                            /> : null
                        }
                        <Typography>{merchantData?.firstname + ' ' + merchantData?.lastname}</Typography>
                        <Typography>{merchantData?.email}</Typography>
                        <Typography>{merchantData?.phone}</Typography>
                    </Box>             
                </Paper>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Car</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Created</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                bids.length > 0 && bids.map((bid) => {
                                    var date = new Date(bid.created * 1000); 
                                    var formattedTime = date.toLocaleString();
                                    return (
                                        <TableRow key={bid.id}>
                                            <TableCell>{bid.carTitle}</TableCell>
                                            <TableCell>{bid.amount}</TableCell>
                                            <TableCell>{formattedTime}</TableCell>
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
