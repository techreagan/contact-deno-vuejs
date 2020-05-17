import { createApp } from 'https://servestjs.org/@v1.0.0/mod.ts'

import contactRoutes from './routes/contacts.ts'

const app = createApp()

app.route('/api/v1/contacts', contactRoutes)

const port = 4002

app.listen({ port })
