import React, { Component } from "react";
import ContactService from "../services/contact";
import { Link } from "react-router-dom";

export default class ContactDetail extends Component {
  constructor(props) {
    super(props);
    this.fetchContacts = this.fetchContacts.bind(this);

    this.state = {
      contact: {},
      phoneNumber: this.props.match.params.phoneNumber
    };
  }

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts() {
    ContactService.findByNumber(this.state.phoneNumber)
      .then(response => {
        this.setState({
          contact: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { contact } = this.state;

    return (
      <div className="list row">

        <div className="col-md-6">
          <h4>Contact Detail</h4>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>{contact.name}</td>
              <td>{contact.phoneNumber}</td>
            </tr>

          </tbody>
        </table>

      </div>
    );
  }
}

