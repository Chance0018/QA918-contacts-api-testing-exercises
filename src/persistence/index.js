import DB from 'nedb-promise'

export let setup = (options = {}) => new DB(options)

export let contacts = setup({ inMemoryOnly: true })

