import {
  createRouter,
  contentTypeFilter,
  RoutingError
} from 'https://servestjs.org/@v1.0.0/mod.ts'

import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contacts.ts'

const router = createRouter()

router.get('/', getContacts)

router.get(new RegExp('/(.{24})'), getContact)

router.post('/', contentTypeFilter('application/json'), createContact)

router.put(
  new RegExp('/(.{24})'),
  contentTypeFilter('application/json'),
  updateContact
)

router.delete(
  new RegExp('/(.{24})'),
  contentTypeFilter('application/json'),
  deleteContact
)

export default router
