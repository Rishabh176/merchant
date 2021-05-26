import React, { memo, useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Box, Paper, Table, TableHead, TableBody, TableCell, TableRow, Typography, Avatar, TablePagination, IconButton } from '@material-ui/core';
import { ToggleOff, ToggleOn } from '@material-ui/icons';
import { BASE_URL } from '../../utils/constant';
import Loader from '../../features/Loader';
import { useStyles } from "./styles";

const Home = memo(() => {

    const history = useHistory();
    const classes = useStyles();

    /**  useState hooks */
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [toggle, setToggle] = useState(true);

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
            <Box className={classes.container}>
                <Box mb={5} mt={3}>
                    <Typography variant="h5">{toggle ? "Max Bid" : "Min Bid" }</Typography>
                    <IconButton onClick={() => setToggle(!toggle)} className={classes.toggleButton}>
                        {
                            toggle ? <ToggleOn /> : <ToggleOff />
                        }
                    </IconButton>
                </Box>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.rowTitle}>Name</TableCell>
                                <TableCell className={classes.rowTitle}>Email</TableCell>
                                <TableCell className={classes.rowTitle}>Phone</TableCell>
                                <TableCell className={classes.rowTitle}>Premium</TableCell>
                                <TableCell className={classes.rowTitle}>Bid</TableCell>
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
                                                <Box className={classes.nameCell}>
                                                    <Avatar variant="circle" src={ele.avatarUrl} className={classes.avatar} />
                                                    <Typography className={classes.name}>{ele.firstname + ' ' + ele.lastname}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{ele.email}</TableCell>
                                            <TableCell>{ele.phone}</TableCell>
                                            <TableCell>{ele.hasPremium === true ? "YES" : "NO"}</TableCell>
                                            <TableCell>{toggle ? maxBid : minBid}</TableCell>
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