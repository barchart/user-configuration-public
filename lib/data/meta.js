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