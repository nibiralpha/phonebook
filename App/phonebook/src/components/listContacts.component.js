import React, { Component } from "react";
import ContactService from "../services/contact";
import { Link } from "react-router-dom";

export default class ContactList extends Component {
  constructor(props) {
    super(props);

    this.fetchContacts = this.fetchContacts.bind(this);
    this.deleteContact = this.deleteContact.bind(this);

    this.state = {
      contacts: [],
    };
  }

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts() {
    ContactService.getAll()
      .then(response => {
        this.setState({
          contacts: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteContact(phoneNumber) {

    ContactService.delete(phoneNumber)
      .then(response => {

        if (response.data.status) {
          alert("Contact Deleted");

          this.state.contacts = this.state.contacts.filter(contact => contact.phoneNumber != phoneNumber);
          this.setState({ contact: this.state.contacts });
        } else {
          alert(response.data.message);
        }

      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { contacts } = this.state;

    return (
      <div className="list row">

        <div className="col-md-6">
          <h4>Contact List</h4>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>


            {contacts &&
              contacts.map((contact, index) => (

                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>
                    <Link to={`/detail/${contact.phoneNumber}`}>
                      View
                    </Link>
                    |
                    <Link to={`/edit/${contact._id}`}>
                      Edit
                    </Link>
                    |
                    <a href="#" onClick={() => this.deleteContact(contact.phoneNumber)}>
                      Delete
                    </a>
                  </td>
                </tr>
              ))}


          </tbody>
        </table>

      </div>
    );
  }
}

