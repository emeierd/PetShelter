import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import validation from './actions/validation'

const CreateForm = ({_id}) => {
    const navigate = useNavigate();
    const [nameValidation, setNameValidation] = useState({ valid: true, text: null });
    const [typeValidation, setTypeValidation] = useState({ valid: true, text: null });
    const [descriptionValidation, setDescriptionValidation] = useState({ valid: true, text: null });
    const [pet, setPet] = useState({});
    const entries = { "id": _id };

    useEffect(() => {
        const getPet = async () => {
            try {
                const petDb = await axios.post('/api/pet/get', entries);
                setPet(petDb.data.pet);
            } catch (err) {
                console.error(err);
                navigate('/');
            }
        }
        getPet();
    }, []);

    const validate = (e) => {
        switch (e.target.name) {
            case "name":
                setNameValidation(validation(e.target.name, e.target.value));
                break;
            case "type":
                setTypeValidation(validation(e.target.name, e.target.value));
                break;
            case "description":
                setDescriptionValidation(validation(e.target.name, e.target.value));
                break;
            default:
                return null;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (nameValidation.valid && typeValidation.valid && descriptionValidation.valid) {
            const formEl = e.target.closest('form');
            const formData = new FormData(formEl);
            const entries = {};
            for (let [key, value] of formData.entries()) entries[key] = value.trim();

            const { name, type, description } = entries;
            const { skill1, skill2, skill3 } = entries;
            const skills = [skill1, skill2, skill3];
            console.log(skills);
            const entries2 = { id: _id,name: name, type: type, description: description, adopted: false, skills: skills }
            console.log(entries2);

            try {
                const res = await axios.patch('/api/pet/edit', entries2);
                console.log(res);
                alert("Pet edited!")
            } catch (err) {
                console.error(err);
                alert("Error, try again")
            }
        } else {
            alert("Form doesn't match all requirements")
        }
    };

    return (
        <div className='form-wrapper'>
            {pet.name
            ? <>
            <h2>Edit {pet.name}</h2>
            <form className='form' onSubmit={onSubmit}>
                <div><label htmlFor='name'>Name</label> {nameValidation.text}</div>
                <input type="text" id="name" name="name" onChange={validate} defaultValue={pet.name} />

                <div><label htmlFor='type'>Type</label> {typeValidation.text}</div>
                <input type="text" id="type" name="type" onChange={validate} defaultValue={pet.type} />

                <div><label htmlFor='description'>Description</label> {descriptionValidation.text}</div>
                <input type="text" id="description" name="description" onChange={validate} defaultValue={pet.description} />

                <div><label htmlFor='skill1'>Skill 1 (optional)</label></div>
                <input type="text" id="skill1" name="skill1" defaultValue={pet.skills[0].skill1} />

                <div><label htmlFor='skill2'>Skill 2 (optional)</label></div>
                <input type="text" id="skill2" name="skill2" defaultValue={pet.skills[0].skill2} />

                <div><label htmlFor='skill3'>Skill 3 (optional)</label></div>
                <input type="text" id="skill3" name="skill3" defaultValue={pet.skills[0].skill3} />
                <button>Edit</button>
            </form>
        </>
        : null}
        </div>
    );

}

export default CreateForm;