import { createRouter } from 'https://servestjs.org/@v1.0.0/mod.ts'

import { getContacts } from '../controllers/contacts.ts'

const router = createRouter()

router.get('/', getContacts)

export default router
