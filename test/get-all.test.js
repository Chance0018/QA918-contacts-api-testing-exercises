import { expect } from 'code'
import { server } from '../src'

import Listen from 'test-listen'
import Request from 'request-promise'
import fetch from 'node-fetch'
import { contacts } from '../src/persistence'

describe('/contacts', () => {
  
  beforeEach(async () => {
    await contacts.remove({})
  })
  
  let uri
  beforeEach(async () => {
    uri = await Listen(server)
  })
  
  afterEach(async () => {
    await server.close()
  })
  
  it(`GET: / -> [] by default`, async () => {
    const response = await fetch(`${uri}`)
    const results = await response.json()
    
    expect(response.status).to.be.equal(200)
    expect(results).to.be.empty()
  })
  
  it(`POST: / -> [] by default`, async () => {
    const payload = { name: 'Testing' }
    const response = await fetch(`${uri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    expect(response.status).to.be.equal(200)
    expect(result.name).to.be.equal(payload.name)
  })
  
})
