import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ location }) => {
    const navigate = useNavigate();

    const backHandler = async (e) => {
        e.preventDefault();
        try {
            navigate(-1);
        } catch (err) {
            console.error(err);
            navigate('/')
        }
    }

    const addHandler = async (e) => {
        e.preventDefault();
        try {
            navigate('/create')
        } catch (err) {
            console.error(err);
            navigate('/')
        }
    }

    return (
        <div className='header'>
            <h2>Pet Shelter</h2>
            {location == "home"
                ? <button onClick={addHandler}>add a pet to the shelter</button>
                : <button onClick={backHandler}>back to home</button>
            }
        </div>
    );
}

export default Header;