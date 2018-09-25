import { expect } from 'code'
import { server } from '../src'

import Listen from 'test-listen'
import Request from 'request-promise'
import { contacts } from '../src/persistence'

describe('/contacts', () => {
  
  beforeEach(async () => {
    await contacts.remove({})
  })
  
  let service
  beforeEach(async () => {
    service = await Listen(server)
    expect(service).to.not.be.undefined()
  })
  
  afterEach(async () => {
    server.close()
  })
  
  it(`returns a [] by default`, async () => {
    const body = await Request(service)
    const response = JSON.parse(body)
    expect(response).to.be.empty()
  })
  
})
