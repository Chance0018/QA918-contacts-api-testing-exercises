require('@babel/polyfill')

import micro, { send, json } from 'micro'
import Cors from 'micro-cors'

const { router, get, post, put, del } = require('microrouter')
import { contacts } from './persistence'


const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'testing'

const cors = Cors()

export const server = micro(cors(
  router(
    get('/', async (req, res) => {
      const results = await contacts.find({})
      return send(res, 200, results)
    }),
    
    post('/', async (req, res) => {
      const contact = await json(req)
      const result = await contacts.insert(contact)
      return send(res, 200, result)
    }),
    
    get('/:id', async (req, res) => {
      const { id } = req.params
      const results = await contacts.findOne({ _id: id })
      if (!results)
        return send(res, 404)
      return send(res, 200, results)
    }),
    
    put('/:id', async (req, res) => {
      const { id } = req.params
      const contact = await json(req)
      const results = await contacts.update({ _id: id }, { $set: contact })
      if (!results)
        return send(res, 404)
      return send(res, 200, results)
    }),
    
    del('/:id', async (req, res) => {
      const { id } = req.params
      const results = await contacts.remove({ _id: id })
      if (!results)
        return send(res, 404)
      return send(res, 200, results)
    }),
    
    get('/*', (req, res) => send(res, 404, { message: 'Route not found' }))
  ))
)

if (env === 'development') {
  server.listen(port, () => console.log(`Server started at: http://localhost:${port}`))
}

