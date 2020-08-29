'use strict';

let contactModel = require('../Database').models.contact;

let create = async (data, callback) => {
  let newContact = new contactModel(data);
  return await newContact.save(callback);
};

let findOne = async (query, projections, options, callback) => {
  return await contactModel.findOne(query, callback);
}

let find = async (query, projections, options, callback) => {
  return await contactModel.find(query, projections, options, callback);
}

let findByIdAndUpdate = async (id, update, options, callback) => {
  return await contactModel.findByIdAndUpdate(id, update, options, callback);
}

let deleteOne = async (query, callback) => {
  return await contactModel.deleteOne(query, callback);
}

module.exports = {
  create,
  findOne,
  find,
  deleteOne,
  findByIdAndUpdate
}