import { Application } from 'https://deno.land/x/oak/mod.ts'

import contactRoutes from './routes/contacts.ts'

const app = new Application()

app.use(async function ({ response }: { response: any }, next) {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  await next()
})

app.use(contactRoutes.routes())
app.use(contactRoutes.allowedMethods())

const ENV = Deno.env.toObject()
const PORT = ENV.PORT || 4002
const HOST = ENV.HOST || '127.0.0.1'

console.log(`Listening on port ${PORT}`)

await app.listen(`${HOST}:${PORT}`)
