import { Router } from 'https://deno.land/x/oak/mod.ts'

import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contacts.ts'

const router = new Router()

const v1 = '/api/v1/contacts'

router
  .get(v1, getContacts)
  .get(`${v1}/:id`, getContact)
  .post(v1, createContact)
  .put(`${v1}/:id`, updateContact)
  .delete(`${v1}/:id`, deleteContact)

export default router
