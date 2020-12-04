import React, { useState,useEffect} from 'react';
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

const Contacts = () => {


    var [contactsObjects,setcontactsObjects] = useState({});

    var [currentId, setCurrentId] = useState('');

    useEffect(() => {
        firebaseDb.child('contacts').on('value', snapshot => {
            if(snapshot.val() != null)
            setcontactsObjects({
                ...snapshot.val()
            })
            else
            setcontactsObjects({})
        })
    }, []) //similar to componentDidMount

    const addOrEdit = obj => {
        if (currentId == '') {
            firebaseDb.child('contacts').push(
                obj,
                err => {
                    if (err)
                        console.log(err);
                    else
                        setCurrentId('')
                }
            )
            
        }
        else
        firebaseDb.child('contacts/'+currentId).set(
            obj,
            err => {
                if (err)
                    console.log(err);
                else
                setCurrentId('')
            }
        )
    }

    const onDelete = key => {
        if(window.confirm("Êtes vous sûr de vouloir supprimer ce contact ?")){ 
            firebaseDb.child('contacts/'+key).remove(
                err => {
                    if (err)
                        console.log(err);
                    else
                    setCurrentId('');
                }
            )
        }
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Contact Register</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ContactForm {...({addOrEdit, currentId, contactsObjects})}/>
                </div>
                <div className="col-md-7">
                    <table className="table table-striped table-borderless">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Full Name</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactsObjects).map(id => {
                                    return <tr key={id}>
                                        <td scope="row">{ contactsObjects[id].fullName}</td>
                                        <td>{ contactsObjects[id].mobile}</td>
                                        <td>{ contactsObjects[id].email}</td>
                                        <td>
                                <a className="btn text-primary" onClick={()=> {setCurrentId(id)}}>
                                                <i className="fas fa-pencil-alt"/>
                                            </a>
                                            <a className="btn text-danger" onClick={()=> {onDelete(id)}}>
                                                <i className="fas fa-trash-alt"/>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
     );
}
 
export default Contacts;