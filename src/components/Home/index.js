import React, { memo, useEffect, useState} from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
// import { useStyles } from "./styles";

const Home = memo(() => {

    /**  useState hooks */
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

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
        return null;
    }
    else {
        return (
            <div>
                Home Page      
            </div>
        );
    }
})

export default Home;