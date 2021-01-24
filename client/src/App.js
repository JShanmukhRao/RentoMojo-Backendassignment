import React, { createContext, useEffect, useReducer, useContext } from "react";
import Navbar from "./components/Navebar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";

import Home from "./components/screens/Home";
import Signup from "./components/screens/Signup";
import Signin from "./components/screens/Signin";
import { reducer, initialState } from "./reducers/userReducer";
import ContactForm from "./components/screens/Contactform";

//<Navbar />
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    let mounted = true;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && mounted) {
      dispatch({ type: "USER", payload: user });
    }
    else {
      history.push("/signin");
    }
    return () => mounted = false
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/addcon" component={ContactForm} />

      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />

    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      user:state.user,
      ans:[],
       dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
