import { createApp } from 'https://servestjs.org/@v1.0.0/mod.ts'

import contactRoutes from './routes/contacts.ts'

const app = createApp()

app.route('/api/v1/contacts', contactRoutes)

// app.get('/', async (req) => {
//   await req.respond({
//     status: 200,
//     headers: new Headers({
//       'content-type': 'application/json'
//     }),
//     body: JSON.stringify({ name: 'hello' })
//   })
// })

const port = 4002

app.listen({ port })
