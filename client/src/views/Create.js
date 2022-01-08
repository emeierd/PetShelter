import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import CreateForm from '../components/CreateForm';

const Details = () => {

    return (
        <>
            <Header location={"details"} />
            <CreateForm/>
        </>
    );
}

export default Details;