'use strict'

module.exports = {
  validUsername: /^[a-z_]([a-z0-9_-]{0,31}|[a-z0-9_-]{0,30}\$)$/,
  saltRounds: 10
}
