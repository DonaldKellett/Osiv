'use strict'

const path = require('path')
const fs = require('fs')

const OSIV_CONF_BASE = process.env.OSIV_CONF_BASE || __dirname
try {
  const DB_PW = fs.readFileSync(path.join(OSIV_CONF_BASE, 'db-pw'))
    .toString()
    .slice(0, -1)
  const MASTER_PW = fs.readFileSync(path.join(OSIV_CONF_BASE, 'master-pw'))
    .toString()
    .slice(0, -1)
  const VALID_USERNAME = /^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/
  const SALT_ROUNDS = 10
  module.exports = {
    DB_PW,
    MASTER_PW,
    VALID_USERNAME,
    SALT_ROUNDS
  }
} catch (err) {
  console.error(err)
  process.exit(1)
}
