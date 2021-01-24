import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";

const ContactForm = () => {
  const contactContext = useContext(UserContext);
  const { dispatch, current } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: ''
      });
    }
  }, [contactContext, current]);
  const history = useHistory();
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const { name, email, phone } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const addContact = contact => {
    const { email, phone } = contact;
    if (phone) {
      if (!/^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(phone)) {
        M.toast({ html: "Invalid Phone Number", classes: "#c62828 red darken-3" });

        return;
      }
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    ) {
      M.toast({ html: "Invalid Email", classes: "#c62828 red darken-3" });

      return;
    }
    fetch('/addcontact', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ contact })
    }).then(res => res.json())
      .then((data) => {
        if (data.err) {
          M.toast({ html: data.err, classes: "#c62828 red darken-3" });
          return;
        } else {

          M.toast({
            html: "Added",
            classes: "#43a047 green darken-1",
          });

          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }
  const updateContact = () => {

    fetch(`/updatecontact/${current._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem("jwt")
      }, body: JSON.stringify({
        contact
      })
    }).then(res => res.json())
      .then((data) => {
        if (data.err) {
          M.toast({ html: data.err, classes: "#c62828 red darken-3" });
          return;
        } else {

          M.toast({
            html: "Updated",
            classes: "#43a047 green darken-1",
          });
          clearAll();

          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }
  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact();
    }
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_CURRENT", payload: null });
  };

  return (
    <form onSubmit={onSubmit} className="form-class">
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />

      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '15px' }}>
          <input
            type='submit'
            value={current ? 'Update Contact' : 'Add Contact'}
            className='btn btn-primary btn-block'
          />
        </div>
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll} >
              Clear
          </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
