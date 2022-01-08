import React from 'react';

const Information = ({ pet }) => {
    console.log(pet);

    return (
        <div className='information'>
            <div className='left'>
                <p>Pet type:</p>
                <p>Description:</p>
                <p>Skills: </p>
            </div>
            <div className='right'>
                <p>{pet.type}</p>
                <p>{pet.description}</p>
                {pet.skills.length > 0
                    ? <div>
                        <p>{pet.skills[0].skill1}</p>
                        <p>{pet.skills[0].skill2}</p>
                        <p>{pet.skills[0].skill3}</p>
                    </div>
                    : null}

            </div>
        </div>
    );
}

export default Information;