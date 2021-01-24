import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css"
const Navbar = () => {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState(false);
  const { user, dispatch } = useContext(UserContext);
  const history = useHistory();

  const renderList = () => {
    if (user) {
      return [
      
        
        <li key={1}>
          <Link className="nav-color" to="/addcon">
            <img className="mini-profile" src={user.pic} />
            {"  "} Add Contact
          </Link>
        </li>,

        <li key={3}>
          <button
            className="btn #c62828 red darken-3"
            type="submit"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key={4}>
          <Link className="nav-color" to="/signin">
            Login{" "}
          </Link>
        </li>,

        <li className="nav-color" key={5}>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };


  return (
    <nav>
      <div className="nav-wrapper #1a237e indigo darken-4">
        <Link to={user ? "/" : "/signin"} className="brand-logo ">
          Phonebook
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down ">
          {renderList()}
        </ul>
      </div>


    </nav>
  );
};
export default Navbar;
