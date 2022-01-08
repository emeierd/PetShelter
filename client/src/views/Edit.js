import React from 'react';
import Header from '../components/Header';
import EditForm from '../components/EditForm';
import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {
    const { state } = useLocation();
    const _id = state._id;

    return (
        <>
            <Header location={"edit"} />
            <EditForm _id={_id}/>
        </>
    );
};

export default Details;