'use-strict'

const contactModel = require('../Model/ContactModel');

exports.create = async (ctx) => {

  let data = ctx.request.body;

  let object = {
    name: data.name,
    phoneNumber: data.phoneNumber
  }

  let validation = validateData(object);

  if (validation.error) {
    ctx.body = { status: false, errorCode: 1000, message: validation };
    return;
  }

  try {
    let create = await contactModel.create(object);
    ctx.body = { status: true };
    return;
  }
  catch (error) {
    console.log(error);
    ctx.body = { status: false, errorCode: 1001, message: "Internal server error. Something wrong with the server" };
  }
}

exports.updateContact = async (ctx) => {
  let data = ctx.request.body;

  let object = {
    name: data.name,
    phoneNumber: data.phoneNumber
  }

  let validation = validateData(object);

  if (validation.error) {
    ctx.body = { status: false, errorCode: 1000, message: validation };
    return;
  }

  try {
    let update = await contactModel.findByIdAndUpdate(data.id, object);
    ctx.body = { status: true };
    return;
  }
  catch (error) {
    console.log(error);
    ctx.body = { status: false, errorCode: 1001, message: "Internal server error. Something wrong with the server" };
  }
}


exports.list = async (ctx) => {
  try {
    let contacts = await contactModel.find({});
    return ctx.body = contacts;
  }
  catch (error) {
    console.log(error);
    ctx.body = { status: false, errorCode: 1001, message: "Internal server error. Something wrong with the server" };
  }
}


exports.getByNumber = async (ctx) => {
  let phoneNumber = ctx.params.phoneNo;

  try {
    let contacts = await contactModel.findOne({ phoneNumber: phoneNumber });
    if (contacts != null) {
      return ctx.body = contacts;
    }

    ctx.body = {};
  }
  catch (error) {
    console.log(error);
    ctx.body = { status: false, errorCode: 1001, message: "Internal server error. Something wrong with the server" };
  }
}

exports.getByID = async (ctx) => {
  let id = ctx.params.id;

  try {
    let contacts = await contactModel.findOne({ _id: id });
    if (contacts != null) {
      return ctx.body = contacts;
    }

    ctx.body = {};
  }
  catch (error) {
    console.log(error);
    ctx.body = { status: false, errorCode: 1001, message: "Internal server error. Something wrong with the server" };
  }
}

exports.deleteContact = async (ctx) => {
  let phoneNumber = ctx.params.phoneNo;

  try {
    let contact = await contactModel.findOne({ phoneNumber: phoneNumber });
    if (contact == null) {
      return ctx.body = { status: false, message: "No entry found with this number" };
    }

    let deleteContact = await contactModel.deleteOne({ phoneNumber: phoneNumber });

    return ctx.body = { status: true };
  }
  catch (error) {
    console.log(error);
    ctx.body = { status: false, errorCode: 1001, message: "Internal server error. Something wrong with the server" };
  }
}


function validateData(data) {

  let validate = {
    error: false
  };

  if (data.name == "") {
    validate.error = true;
    validate.name = "Name field can not be empty."
  }

  if (data.phoneNumber == "") {
    validate.error = true;
    validate.phoneNumber = "Phone number can not be empty."
  }

  let validateNumber = validateNumberFormat(data.phoneNumber);
  if (!validateNumber) {
    validate.error = true;
    validate.phoneNumber = "Please enter a valid number"
  }

  return validate;
}

function validateNumberFormat(phoneNumber) {
  let pattern = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

  if (phoneNumber.match(pattern)) {
    return true;
  }
  else {
    return false;
  }
}