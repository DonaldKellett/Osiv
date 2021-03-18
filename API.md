# Osiv API

This document defines the Osiv API. An HTTP(S) server conforming to the API by exposing the endpoints defined below with the documented behavior is said to be Osiv-compliant.

Note that all responses below are assumed to be JSON unless otherwise specified.

API version: `0.1.0`

## Server Metadata

### `GET /`

Returns metadata about the server.

It should always return a `200 OK` status code, unless there is an internal server error in which a 5xx status code should be returned instead. No other status codes should be returned by this endpoint when accessed with the `GET` method.

#### `200 OK`

On `200 OK`, the server should return a JSON object with the following fields:

- `"name"`: The name of the server. Should be `"Osiv"`
- `"version"`: The version of the Osiv API that the server adheres to. Should be a SemVer compliant version number, e.g. `"0.1.0"`
- `"timeout"`: Timeout for account logins, in seconds. E.g. if a login timeouts after 24 hours, the value should be `86400`

## Account creation and deletion

### `POST /signup`

Signs up for an account. When this endpoint is used with POST, the server expects JSON data containing the following fields:

- `"privileged"`: A boolean value indicating whether the account to be created is privileged
- `"prettyName"`: A human-readable name associated with the account, e.g. `"John Doe"`. There should be as few restrictions on the format of this field as possible. For example, rejecting pretty names over 1024 characters would be acceptable, but rejecting any pretty name with non-alphanumeric characters would not be acceptable
- `"username"`: A unique identifier for the account, e.g. `"johndoe"`. The server may enforce suitable restrictions on the format of this field, e.g. it may choose to accept all valid Unix usernames, and only those usernames
- `"password"`: The plaintext password for the account. The server may enforce sensible rules on the format of the password, e.g. they should be between 8 and 128 characters long, but please don't go overboard with this, e.g. requiring passwords to contain at least one uppercase letter, one lowercase, one digit and one special character is infuriating and does little to increase password security. Of course the server should not store the plaintext password as-is, but that is considered an implementation detail irrelevant to the API itself
- `"masterPassword"`: Optional field that is only checked by the server when a privileged account is being created. The server should only ever accept a single master password as valid, and the master password should be kept secret

TODO: define possible status code the server should return and the associated JSON payload

## Account modification

TODO

## Account login and logout

TODO

## Account actions

TODO
