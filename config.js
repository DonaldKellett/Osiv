'use strict'

const path = require('path')
const fs = require('fs')

const OSIV_CONF_BASE = process.env.OSIV_CONF_BASE || __dirname
try {
  const NAME = 'Osiv'
  const VERSION = '0.1.0'
  const TIMEOUT = 86400
  const DB_PW = fs.readFileSync(path.join(OSIV_CONF_BASE, 'db-pw'))
    .toString()
    .slice(0, -1)
  const MASTER_PW = fs.readFileSync(path.join(OSIV_CONF_BASE, 'master-pw'))
    .toString()
    .slice(0, -1)
  const JWT_SECRET = fs.readFileSync(path.join(OSIV_CONF_BASE, 'jwt-secret'))
    .toString()
    .slice(0, -1)
  const VALID_USERNAME = /^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/
  const SALT_ROUNDS = 10
  module.exports = {
    NAME,
    VERSION,
    TIMEOUT,
    DB_PW,
    MASTER_PW,
    JWT_SECRET,
    VALID_USERNAME,
    SALT_ROUNDS
  }
} catch (err) {
  console.error(err)
  process.exit(1)
}
