import Api from '@/services/Api'

export default {
  getAll() {
    return Api().get('contacts')
  },
  getById(id) {
    return Api().get(`contacts/${id}`)
  },
  createContact(data) {
    return Api().post('contacts', data)
  },
  updateContact(id, data) {
    return Api().put(`contacts/${id}`, data)
  },
  deleteById(id) {
    return Api().delete(`contacts/${id}`)
  }
}
