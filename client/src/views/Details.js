import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Information from '../components/Information';

const Details = () => {
    const { state } = useLocation();
    const [pet, setPet] = useState({});
    const entries = { "id": state._id };
    const navigate = useNavigate();
    const [like, setLike] = useState("");

    useEffect(() => {
        const getPet = async () => {
            try {
                const petDb = await axios.post('/api/pet/get', entries);
                setPet(petDb.data.pet);
                setLike(pet.likes);
            } catch (err) {
                console.error(err);
                navigate('/');
            }
        }
        getPet();
    }, [like]);

    const adopt = (e) => {
        e.preventDefault();
        const adopt = async () => {
            try {
                await axios.post('/api/pet/adopt', entries);
                navigate('/');
            } catch (err) {
                console.error(err);
                navigate('/');
            }
        }
        adopt();
    };

    const likePet = (e) => {
        const likePet = async () => {
            try {
                await axios.post('/api/pet/like', entries);
                setLike(like+1);
            } catch (err) {
                console.error(err);
                alert("Error, " + err);
            }
        }
        likePet();
    }

    return (
        <>
            <Header location={"details"} />
            {pet.name
                ?
                <>
                    <div className='header-details'>
                        <h3>Details about: {pet?.name}</h3>
                        <button onClick={adopt}>🏠Adopt {pet.name}</button>
                    </div>
                    <Information pet={pet} />
                </>
                : null}
            <div className='likes'>
                <button onClick={likePet}>👍 Like {pet?.name}</button>
                <p>{pet?.likes} like(s)</p>
            </div>
        </>
    );
}

export default Details;