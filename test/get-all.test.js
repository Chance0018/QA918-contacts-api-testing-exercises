import { expect } from 'code'
import Listen from 'test-listen'
import fetch from 'node-fetch'

import { server } from '../src'
import { contacts } from '../src/persistence'

describe('/', () => {
  
  beforeEach(async () => await contacts.remove({}))
  
  let uri
  beforeEach(async () => {
    uri = await Listen(server)
  })
  
  afterEach(async () => await server.close())
  
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
  
  it(`PUT: /:id -> {}}`, async () => {
    const payload = { name: 'Testing' }
    const UPDATED_NAME = 'Testing 123'
    const { _id } = await contacts.insert(payload)
    
    const response = await fetch(`${uri}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: UPDATED_NAME }),
    })
    
    const result = await response.json()
    expect(response.status).to.be.equal(200)
    expect(result.name).to.be.equal(UPDATED_NAME)
  })
  
  it(`DELETE: /:id -> {}`, async () => {
    const payload = { name: 'Testing' }
    const { _id } = await contacts.insert(payload)
    
    const response = await fetch(`${uri}/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    const result = await response.json()
    expect(response.status).to.be.equal(200)
  })
  
})
