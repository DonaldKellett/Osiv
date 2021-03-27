'use strict'

const path = require('path')
const fs = require('fs')

const OSIV_CONF_BASE = process.env.OSIV_CONF_BASE || __dirname
const DB_PW = path.join(OSIV_CONF_BASE, 'db-pw')
const MASTER_PW = path.join(OSIV_CONF_BASE, 'master-pw')

try {
  module.exports = {
    dbPw: fs.readFileSync(DB_PW).toString().slice(0, -1),
    masterPw: fs.readFileSync(MASTER_PW).toString().slice(0, -1)
  }
} catch (err) {
  console.error(err)
  process.exit(1)
}
