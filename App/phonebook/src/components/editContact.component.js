import React, { Component } from "react";
import ContactService from "../services/contact";

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.fetchContacts = this.fetchContacts.bind(this);

    this.state = {
      name: "",
      phoneNumber: "",
      errorMsg: {
        name: "",
        phoneNumber: "",
        server: ""
      },
      contactSave: false
    };
  }

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts() {
    ContactService.findByID(this.props.match.params.id)
      .then(response => {


        if (response.data._id !== undefined) {
          this.setState({
            name: response.data.name,
            phoneNumber: response.data.phoneNumber,
          });
        }

      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    });
  }

  updateContact() {
    var data = {
      id: this.props.match.params.id,
      name: this.state.name,
      phoneNumber: this.state.phoneNumber
    };

    this.setState({ errorMsg: { name: "", phoneNumber: "", server: "" } });

    ContactService.update(data)
      .then(response => {
        let data = response.data;

        if (data.status == false) {

          this.setState({ contactSave: false });

          if (data.errorCode == 1000) {
            if (data.message.name !== undefined) {
              this.setState({ errorMsg: { ...this.state.errorMsg, name: data.message.name } });
            }

            if (data.message.phoneNumber !== undefined) {
              this.setState({ errorMsg: { ...this.state.errorMsg, phoneNumber: data.message.phoneNumber } });
            }
          }

          if (data.errorCode == 1001) {
            this.setState({ errorMsg: { ...this.state.errorMsg, server: data.message } });
          }

        } else {
          this.setState({ contactSave: true });
        }

      })
      .catch(e => {
        console.log(e);
      });
  }



  render() {


    let nameMsg;
    let phoneNumberMsg;
    let serverMsg;
    let saveSuccessMsg;

    if (this.state.errorMsg.name != "") {
      nameMsg =
        <div className="alert alert-danger">
          <strong>Error!</strong> {this.state.errorMsg.name}
        </div>;

    }

    if (this.state.errorMsg.phoneNumber != "") {
      phoneNumberMsg =
        <div className="alert alert-danger">
          <strong>Error!</strong> {this.state.errorMsg.phoneNumber}
        </div>;
    }

    if (this.state.errorMsg.server != "") {
      serverMsg =
        <div className="alert alert-danger">
          <strong>Error!</strong> {this.state.errorMsg.server}
        </div>;
    }

    if (this.state.contactSave) {
      saveSuccessMsg =
        <div className="alert alert-success">
          <strong>Success!</strong> contact updated
        </div>;
    }

    return (
      <div className="submit-form">

        <div>
          <div className="form-group">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={this.state.name}
              onChange={this.onChangeName}
              name="name"
              placeholder="Ex: Jhon"
            />
          </div>

          {nameMsg}

          <div className="form-group">
            <label htmlFor="description">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              required
              value={this.state.phoneNumber}
              onChange={this.onChangeNumber}
              name="phoneNumber"
              placeholder="Ex: 01677243624"
            />
          </div>

          {phoneNumberMsg}

          <button onClick={this.updateContact} className="btn btn-success">
            Submit
          </button>

          {saveSuccessMsg}
          {serverMsg}
        </div>

      </div>
    );
  }

}