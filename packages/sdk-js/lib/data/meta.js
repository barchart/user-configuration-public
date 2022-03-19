/**
 * A meta namespace containing structural contracts of anonymous objects.
 *
 * @namespace Schema
 */

/**
 * An object describing ad hoc preferences for a user.
 *
 * @typedef UserConfiguration
 * @type Object
 * @memberOf Schema
 * @property {String} user - The user identifier for the watchlist's owner. Omit when creating a new watchlist — the backend will assign.
 * @property {String} context - The context identifier for the watchlist's owner. Omit when creating a new watchlist — the backend will assign.
 */

/**
 * An object describing the connection to the remote service.
 *
 * @typedef UserConfigurationServiceMetadata
 * @type Object
 * @memberOf Schema
 * @property {String} server.semver - The remote service's software version number.
 * @property {String} server.environment - The remote service's environment name (e.g. production, test, staging, etc).
 * @property {String} user.id - The current user's identifier.
 * @property {String} user.permissions - The current user's permission level.
 * @property {String} context.id - The current user's context (i.e. Barchart customer identifier).
 */