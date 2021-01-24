import React, { useContext, useEffect, useState } from 'react';
import Card from './Card'
import M from "materialize-css";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";
import Pagination from "../Hooks/usePagination"
const Home = () => {
    
    
    const history = useHistory();
    const [standedData, setStandedData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [final, setFinal] = useState([])
    const contactContext = useContext(UserContext);
    const { dispatch } = contactContext;
    useEffect(() => {
        fetch('/allcontacts', {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setStandedData(result.contacts);
                setTotalPages(Math.ceil(result.contacts.length / 10));
                setData(result.contacts)
            })

    }, [])
    const deleteContact = (contactId) => {
        fetch(`/deletecontact/${contactId}`, {
            method: "delete",
            headers: {
                "authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                const newData = standedData.filter(item => {
                    return item._id !== result._id;
                })
                setData(newData)
                setStandedData(newData)
               
            }).catch(err => {
                M.toast({ html: err, classes: "#c62828 red darken-3" });
            })
    }
    const editContact = contact => {
        return (
            dispatch({ type: "SET_CURRENT", payload: contact }),
            history.push("/addcon")
        )
    }

    const handleChange = e => {
        var formatedData = standedData;
        const newData = formatedData.filter(contact => {
            const regex = new RegExp(`${e.target.value}`, 'gi');
            return contact.name.match(regex) || contact.email.match(regex);
        })
        setData(newData)
    }
    const handleClick = num => {
        
        const startIndex = (num -1) * 10;
        const selected=standedData.slice(startIndex, startIndex + 10);
setData(selected)
    }
   


    return (
        <div>
            <div style={{ margin: "auto", maxWidth: "500px" }}>
                <input placeholder="Search" onChange={(e) => handleChange(e)}  />
            </div>
            {data.map(user => (
                <Card
                    item={user}
                    key={user._id}
                    EditContact={(contact) => editContact(contact)}
                    DeleteContact={(contactId) => deleteContact(contactId)}

                />
            ))}
                        <Pagination totalPages={totalPages} handleClick={handleClick} />

        </div>
    )

}
export default Home;
