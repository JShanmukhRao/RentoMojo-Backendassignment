import React, { useState, useEffect, useContext, useStateCallback } from 'react'
import M from "materialize-css";
import Card from './Card'
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";
import Pagination from 'react-paginate'

const Home = () => {
    const [search, setSearch] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const contactContext = useContext(UserContext);
    const { dispatch, ans } = contactContext;
    const [standedData, setStandedData] = useState([]);
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(1);
    const [perPage, setPerPage] = useState(4);
    const [currPage, setCurrPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);



    const history = useHistory();

    useEffect(() => {

        fetch('/allcontacts', {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {


                setStandedData(result.contacts);
                setPageCount(Math.ceil(result.contacts.length / perPage));
                var slice = result.contacts.slice(offset, offset + perPage);

                setData(slice)

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
                const newData = data.filter(item => {
                    return item._id !== result._id;
                })
                setData(newData)
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
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
        setCurrPage(selectedPage)

        loadMoreData()
    }
    const loadMoreData = () => {
        console.log("load")
        const data = standedData;
        var slice = data.slice(offset, offset + perPage);
        setPageCount(Math.ceil(data.length / perPage));
        setData(slice)

    }
    const handleChange = e => {
        setSearchValue(e.target.value)
        var formatedData = standedData;
        const newData = formatedData.filter(contact => {
            const regex = new RegExp(`${e.target.value}`, 'gi');
            return contact.name.match(regex) || contact.email.match(regex);
        })

        setData(newData)

    }

    return (
        <div>

            <div style={{ margin: "auto", maxWidth: "500px" }}>
                <input placeholder="Search" onChange={(e) => handleChange(e)} />


            </div>
            {


                data.map(item => {
                    return (
                        <Card item={item}
                            DeleteContact={(contactId) => deleteContact(contactId)}
                            EditContact={(contact) => editContact(contact)}
                        />
                    )
                })
            }
            <Pagination
            previousClassName={"<"}
            nextClassName={">"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            containerClassName={"pagination"}
            onPageChange={handlePageClick}
            activeClassName={"active"}

            />
        </div>
    );
}
export default Home;
