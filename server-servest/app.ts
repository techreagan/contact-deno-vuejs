import { createApp, RoutingError } from 'https://servestjs.org/@v1.0.0/mod.ts'

import contactRoutes from './routes/contacts.ts'

const app = createApp()

app.route('/api/v1/contacts', contactRoutes)

// Define global error handler for app
app.catch(async (e, req) => {
  if (e instanceof RoutingError && e.status === 404) {
    try {
      await req.respond({
        status: 404,
        headers: new Headers({
          'content-type': 'application/json'
        }),
        body: JSON.stringify({
          success: false,
          data: `Resources not found`
        })
      })
    } finally {
    }
  } else {
    await req.respond({
      status: 500,
      body: 'Internal Server Error'
    })
  }
})
const port = 4002

app.listen({ port })
