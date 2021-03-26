'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return {
      name: 'Osiv',
      version: '0.1.0',
      timeout: 86400
    }
  })
}
