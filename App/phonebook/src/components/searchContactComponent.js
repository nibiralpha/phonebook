import React, { Component } from "react";
import ContactService from "../services/contact";
import { Link } from "react-router-dom";

export default class ContactSearch extends Component {
  constructor(props) {
    super(props);
    this.fetchContacts = this.fetchContacts.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      contact: {},
      phoneNumber: "",
    };
  }

  // componentDidMount() {
  //   this.fetchContacts();
  // }

  fetchContacts() {
    ContactService.findByNumber(this.state.phoneNumber)
      .then(response => {
        if (response.data._id === undefined) {
          alert("No data found");
          this.setState({ contact: {} });
          return;
        }

        this.setState({
          contact: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeNumber(e) {
    this.setState({ phoneNumber: e.target.value });
  }

  onSubmit() {
    this.fetchContacts();
  }

  render() {
    const { contact } = this.state;

    return (
      <div className="list row">

        <input onChange={this.onChangeNumber} type="text" placeholder="ex: 01677246671"></input>
        <button onClick={this.onSubmit}>Search</button>

        <div className="col-md-12">
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

      </div >
    );
  }
}

