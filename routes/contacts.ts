import {
  createRouter,
  contentTypeFilter
} from 'https://servestjs.org/@v1.0.0/mod.ts'

import {
  getContacts,
  getContact,
  createContact
} from '../controllers/contacts.ts'

const router = createRouter()

router.get('/', getContacts)

router.get('/:id', getContact)

router.post('/', contentTypeFilter('application/json'), createContact)

export default router
