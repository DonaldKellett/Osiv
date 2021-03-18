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

## License

GPLv3 or any later version at your discretion
