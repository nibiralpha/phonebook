import http from "../config";

class ContactService {
  getAll() {
    return http.get("/contact/list");
  }

  create(data) {
    return http.post("/contact/add", data);
  }

  update(data) {
    return http.post(`/contact/update`, data);
  }

  delete(number) {
    return http.get(`/contact/delete/${number}`);
  }

  findByNumber(number) {
    return http.get(`/contact/detail/${number}`);
  }
  findByID(id) {
    return http.get(`/contact/getByID/${id}`);
  }
}

export default new ContactService();
