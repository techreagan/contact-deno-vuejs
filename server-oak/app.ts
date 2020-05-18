import { Application } from 'https://deno.land/x/oak/mod.ts'

import contactRoutes from './routes/contacts.ts'

const app = new Application()

app.use(contactRoutes.routes())
app.use(contactRoutes.allowedMethods())

const ENV = Deno.env.toObject()
const PORT = ENV.PORT || 4002
const HOST = ENV.HOST || '127.0.0.1'

console.log(`Listening on port ${PORT}`)

await app.listen(`${HOST}:${PORT}`)
