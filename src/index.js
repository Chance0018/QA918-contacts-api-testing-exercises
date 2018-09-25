require('@babel/polyfill')

import micro, { send } from 'micro'

const { router, get } = require('microrouter')
import { contacts } from './persistence'


const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'testing'


export const server = micro(
  router(
    get('/', async (req, res) => await send(res, 200, (await contacts.find({}))),
        get('/*', (req, res) => send(res, 404, { message: 'Route not found' })),
    ),
  ),
)

if (env !== 'testing') {
  server.listen(port, () => console.log(`Server started at: http://localhost:${port}`))
}

