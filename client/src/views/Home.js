import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const Home = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const getPets = async () => {
            try {
                const petsDb = await axios.get('/api/pet/getAll');
                console.log(petsDb)
                setPets(petsDb.data.pets);
            } catch (err) {
                console.error(err);
            }
        }
        getPets();
    }, []);

    const goToDetails = (e, _id) => {
        e.preventDefault();
        navigate('/details', { state: { _id: _id } });
    }

    const goToEdit = (e, _id) => {
        e.preventDefault();
        navigate('/edit', { state: { _id: _id } });
    }

    return (
        <>
          <Header location={"home"}/>
          <h3>These pets are looking for a good home</h3>
          <table className='table'>
                    <thead className='thead'>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </thead>
                    <tbody className='tbody'>
                        {pets?.sort((a, b) => a.type.localeCompare(b.type)).map((pet, i) => <tr key={i}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td>
                                <button onClick={e => goToDetails(e, pet._id)}>details</button>
                                <p>|</p>
                                <button onClick={e => goToEdit(e, pet._id)}>edit</button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
        </>
    );
}

export default Home;
