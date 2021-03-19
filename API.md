# Osiv API

This document defines the Osiv API. An HTTP(S) server conforming to the API by exposing the endpoints defined below with the documented behavior is said to be Osiv-compliant.

Note that all responses below are assumed to be JSON unless otherwise specified.

API version: `0.1.0`

## Server Metadata

### `GET /`

Returns metadata about the server.

It should always return a `200 OK` status code, unless there is an internal server error in which a 5xx status code should be returned instead. No other status codes should be returned by this endpoint.

#### `200 OK`

On `200 OK`, the server should return a JSON object with the following fields:

- `"name"`: The name of the server. Should be `"Osiv"`
- `"version"`: The version of the Osiv API that the server adheres to. Should be a SemVer compliant version number, e.g. `"0.1.0"`
- `"timeout"`: Timeout for account logins, in seconds. E.g. if a login timeouts after 24 hours, the value should be `86400`

## Account creation and deletion

### `POST /signup`

Signs up for an account. When this endpoint is used, the server expects JSON data containing the following fields:

- `"privileged"`: A boolean value indicating whether the account to be created is privileged
- `"prettyName"`: A human-readable name associated with the account, e.g. `"John Doe"`. There should be as few restrictions on the format of this field as possible. For example, rejecting pretty names over 1024 characters would be acceptable, but rejecting any pretty name with non-alphanumeric characters would not be acceptable
- `"username"`: A unique identifier for the account, e.g. `"johndoe"`. The server may enforce suitable restrictions on the format of this field, e.g. it may choose to accept all valid Unix usernames, and only those usernames
- `"password"`: The plaintext password for the account. The server may enforce sensible rules on the format of the password, e.g. they should be between 8 and 128 characters long, but please don't go overboard with this, e.g. requiring passwords to contain at least one uppercase letter, one lowercase, one digit and one special character is infuriating and does little to increase password security. Of course the server should not store the plaintext password as-is, but that is considered an implementation detail irrelevant to the API itself
- `"masterPassword"`: Optional field that is only checked by the server when a privileged account is being created. The server should only ever accept a single master password as valid, and the master password should be kept secret

This endpoint may return any of the following status codes and only these status codes, unless there is a server error in which a 5xx status code is returned:

- `201 Created`
- `400 Bad Request`
- `403 Unauthorized`

#### `201 Created`

The account (whether privileged or not) has been successfully created. A JSON object should be returned, but there are no mandatory fields, i.e. an empty object `{}` is valid.

#### `400 Bad Request`

The account has not been created due to missing or invalid POST data, e.g. the client forgot to include a username or the password is too short. This return code should also be used if an account associated with the provided username already exists.

Note that an invalid master password when creating a privileged account should return `403 Unauthorized` instead. A missing master password when creating a privileged account can be handled either way.

On `400 Bad Request`, a JSON object should be returned with the following fields:

- `"reason"`: A short human-readable description of what user-invoked action caused the account creation to fail, e.g. `"The provided username must be between 1 and 32 characters."`

#### `403 Unauthorized`

The privileged account has not been created due to an invalid master password being supplied. A missing master password when creating a privileged account may also trigger this return code (if not, a `400 Bad Request` should be returned instead).

On `403 Unauthorized`, a JSON object should be returned with the following fields:

- `"reason"`: A short human-readable description of what user-invoked action caused the account creation to fail, e.g. `"Master password was not as expected."`

### `POST /delete`

Deletes the account with the given username provided that the action is authorized with the user's password OR the master password. In a valid request to this endpoint, the user's password and master password should NOT be simultaneously provided.

The server expects JSON data containing the following fields:

- `"username"`: The username of the account to be deleted, e.g. `"johndoe"`
- `"password"`: The plaintext password associated with the given username. Should NOT appear simultaneously with the `"masterPassword"` field
- `"masterPassword"`: The master password in plaintext. Should NOT appear simultaneousy with the `"password"` field

This endpoint may return any of the following status codes and only these status codes, unless there is a server error in which a 5xx status code is returned:

- `204 No Content`
- `400 Bad Request`
- `403 Unauthorized`
- `404 Not Found`

#### `204 No Content`

The account has been successfully deleted. No JSON payload is required.

#### `400 Bad Request`

The JSON payload associated with the request is malformed, e.g. some fields are missing. The server should respond with a JSON payload containing the following fields:

- `"reason"`: A short human-readable description of the user-invoked error, e.g. `"The user's and master password fields should not appear simultaneously."`

#### `403 Unauthorized`

The account deletion request failed due to an incorrect password. Note that it is acceptable to replace this response with `404 Not Found` in order to conceal sensitive information from potential attackers; see below for more details.

The server should respond with a JSON payload containing the following fields:

- `"reason"`: A short human-readable description of the user-invoked error, e.g. `"The master password provided was incorrect."`

#### `404 Not Found`

The account associated with the given username was not found and therefore could not be deleted. Note that it is acceptable to return this response for incorrect passwords as well in order to conceal sensitive information from potential attackers.

The server should respond with a JSON payload containing the following fields:

- `"reason"`: A short human-readable description of the user-invoked error, e.g. `"The username could not be found or the supplied password is incorrect."`

## Account modification

TODO

## Account login and logout

TODO

## Account actions

TODO
