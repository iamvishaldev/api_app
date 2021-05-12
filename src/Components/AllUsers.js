import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const AllUsers = () => {

    const [allContacts, setallContacts] = useState([]);

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState(null);
    const [editNumber, setEditNumber] = useState(null);


    const fetchAllContacts = async () => {
        const allContactsData = await axios.get('https://nooglecontacts.herokuapp.com/api/get_contacts/');
        setallContacts(allContactsData.data);
    }

    useEffect(() => {
        fetchAllContacts();
    }, [])

    const deleteContact = async (event, deleteId) => {
        const deletedContact = await axios.delete(`https://nooglecontacts.herokuapp.com/api/delete_contact/${deleteId}`)
        console.log('deleteedContact: ', deletedContact)
        fetchAllContacts();
    }

    const editContact = (event, editId, name, number) => {
        setEditId(editId);
        setEditName(name);
        setEditNumber(number);
    }

    const updateContact = async (event) => {
        event.preventDefault();

        const updateData = {
            name: editName,
            mobile_num: editNumber
        }

        const updatedData = await axios.patch(`https://nooglecontacts.herokuapp.com/api/update_contact/${editId}`, updateData)
        fetchAllContacts();
        setEditId(null)

    }

    const EditForm = () => {
        return (
            <form
                onSubmit={updateContact}
            >
                <input type="text"
                    placeholder="Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                />
                <br />

                <input type="number"
                    placeholder="Number"
                    value={editNumber}
                    onChange={(e) => setEditNumber(e.target.value)}
                />
                <br />

                <button type="submit" class="btn btn-primary">Update Contact</button>
            </form>
        )
    }

    return (
        <div>
            <Link to='/create'><button>Add Contact</button></Link>

            {
                editId && <EditForm />
            }


            {
                allContacts.length > 0 && allContacts.map(singleContact => (
                    <div>
                        <span>{singleContact.name}</span>
                        &nbsp; &nbsp; &nbsp;
                        <span>{singleContact.mobile_num}</span>

                        &nbsp; &nbsp; &nbsp;
                        <button className="bt btn-warning" onClick={(event) => editContact(event, singleContact._id, singleContact.name, singleContact.mobile_num)}>Edit</button>
                        <button onClick={(event) => deleteContact(event, singleContact._id)}>Delete</button>
                    </div>
                ))
            }
        </div >
    )
}

export default AllUsers;