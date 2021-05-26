import React, { memo, useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Box, Paper, Table, TableHead, TableBody, TableCell, TableRow, Typography, Avatar, TablePagination } from '@material-ui/core';
import { BASE_URL } from '../../utils/constant';
import Loader from '../../features/Loader';
// import { useStyles } from "./styles";

const Home = memo(() => {

    const history = useHistory();

    /**  useState hooks */
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const fetchdata = () => {
        //Api call
        axios.get(BASE_URL, {})
            .then((response) => {
                setData(response.data)
                setLoading(false);
            })
            .catch((error) => {
                alert(error);
                setLoading(false);
            });
    }

    console.log("data--->", data);

    if (loading) {
        return <Loader />;
    }
    else {
        return (
            <Box>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Premium</TableCell>
                                <TableCell>Bid</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ele) => {
                                    let bids = ele.bids;
                                    let maxBid = bids.length > 0 ? Math.max.apply(Math, bids.map(function(o) { return o.amount; })) : 0
                                    let minBid = bids.length > 0 ? Math.min.apply(Math, bids.map(function(o) { return o.amount; })) : 0
                                    return(
                                        <TableRow key={ele.id} onClick={() => {history.push(`/merchant/${ele.id}`)}}>
                                            <TableCell>
                                                <Box display="flex" flexDirection="row" justifyContent="space-between">
                                                    <Avatar variant="circle" src={ele.avatarUrl} />
                                                    <Typography>{ele.firstname + ' ' + ele.lastname}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{ele.email}</TableCell>
                                            <TableCell>{ele.phone}</TableCell>
                                            <TableCell>{ele.hasPremium === true ? "YES" : "NO"}</TableCell>
                                            <TableCell>{ maxBid }</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        );
    }
})

export default Home;