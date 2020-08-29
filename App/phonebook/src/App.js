import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddContact from "./components/addContact.component";
import ContactList from "./components/listContacts.component";
import ContactDetail from "./components/detailContact.component";
import ContactUpdate from "./components/editContact.component";
import ContactSearch from "./components/searchContactComponent";


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Phoneook
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                All contacts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/search"} className="nav-link">
                Search
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            {/* <Route exact path={["/", "/tutorials"]} component={TutorialsList} /> */}
            <Route exact path={["/"]} component={ContactList} />
            <Route exact path="/add" component={AddContact} />
            <Route exact path="/edit/:id" component={ContactUpdate} />
            <Route path="/detail/:phoneNumber" component={ContactDetail} />
            <Route path="/search" component={ContactSearch} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;
