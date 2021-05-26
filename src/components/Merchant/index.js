import React, { memo, useEffect, useState } from 'react';
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

    if (loading) {
        return <Loader />;
    }
    else {
        return (
            <div>
                Merchant Page      
            </div>
        );
    }
})

export default withRouter(Merchant);
