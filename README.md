# Osiv

Minimal example of authentication server with two tiers of users

## Overview

A minimal example of an authentication server with two tiers of users:

- "Privileged" users that can only be created with a master password
- "Unprivileged" users that can sign up freely

Of course, it is not a hard requirement that "privileged" users have more rights than "unprivileged" ones, but the idea is that one should not be able to randomly sign up for a "privileged" account which may somehow be considered more important than an "unprivileged" one.

## Why the name?

More on that later ;-)

## API

This is the application programming interface (API) exposed to the client by a server that respects the Osiv API. See API.md for more details.

## Usage

The reference implementation of Osiv in this repo is written in Node.js with Fastify and depends on an MySQL database for storing account information.

To get started with Osiv:

1. Clone/download the repo to your Web server with Node.js installed: `$ git clone https://github.com/DonaldKellett/Osiv.git`
1. Change directory to the root of this repo: `$ cd /path/to/your/Osiv`
1. Ensure you have administrative access to a server with MySQL installed and running
1. Run the `osiv.sql` script on the MySQL server as the MySQL root user, e.g. you would do this on CentOS 8 Stream: `$ mysql -u root -p < /path/to/your/Osiv/osiv.sql`
1. Back in your Web server, edit `config/db-host` to point to the IP address or hostname of your MySQL server (if located elsewhere from your Web server)
1. (Recommended) Run suitable queries on the MySQL server to change the password for the MySQL `osiv` user (default: `P@ssw0rd`) and update `config/db-pw` accordingly to instruct the Web server to connect to the database server using this new password
1. (Recommended) Edit `config/jwt-secret` and `config/master-pw` accordingly to set a new JWT secret and master password respectively
1. (Optional) Edit `config/timeout` to modify the login timeout for users
1. Ensuring that you are in the root directory of this repo, run `$ npm install` to install all the required Node.js modules and dependencies
1. Run `$ npm start` to start the Web server at port 3000 and enjoy :-)

The behavior of the Web server can be further configured via two environment variables:

- `OSIV_CONF_BASE`: Controls where the Web server reads its configuration. Defaults to `/path/to/your/Osiv/config`
- `PORT`: Controls which port the Web server listens to. Defaults to 3000

## Known Issues

The `GET /logout` endpoint does not actually invalidate the JWT login token since JWT tokens cannot be invalidated and maintaining a blacklist of invalidated tokens in-memory violates the REST principle. This should not pose a major security risk as long as the client discards the login token on logout and prevents it from leaking to untrusted third parties before the token expires. But then, Osiv is not meant for production use out-of-the-box anyway since it uses HTTP by default instead of HTTPS, voiding any and all security guarantees (-:

## License

GPLv3 or any later version at your discretion
