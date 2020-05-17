import {
  createRouter,
  contentTypeFilter
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

router.post('/single', getContact)

router.post('/', contentTypeFilter('application/json'), createContact)

router.put('/', contentTypeFilter('application/json'), updateContact)

router.post('/delete', contentTypeFilter('application/json'), deleteContact)

export default router
