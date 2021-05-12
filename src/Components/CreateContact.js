import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const CreateContact = () => {

    const history = useHistory()

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const addContactToDB = async (event) => {
        event.preventDefault();

        const newContactData = {
            name,
            mobile_num: number
        }

        const savedContact = await axios.post('https://nooglecontacts.herokuapp.com/api/create_contact', newContactData);

        if (savedContact.data) {
            history.push('/')
        }

    }

    return (
        <div>
            <form onSubmit={addContactToDB}>
                <input type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />

                <input type="number"
                    placeholder="Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                <br />

                <button type="submit" class="btn btn-primary">Create Contact</button>
            </form>
        </div>
    )
}

export default CreateContact;