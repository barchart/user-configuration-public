const EndpointBuilder = require('@barchart/common-js/api/http/builders/EndpointBuilder'),
	ProtocolType = require('@barchart/common-js/api/http/definitions/ProtocolType'),
	ResponseInterceptor = require('@barchart/common-js/api/http/interceptors/ResponseInterceptor'),
	VerbType = require('@barchart/common-js/api/http/definitions/VerbType');

const Configuration = require('./../../common/Configuration');

module.exports = (() => {
	'use strict';

	/**
	 * Static utilities for JWT token generation (used for development purposes only).
	 *
	 * @public
	 */
	class JwtEndpoint {
		constructor(endpoint, refreshInterval) {

		}

		/**
		 * Creates and starts a new {@link JwtEndpoint} for use in the development environment.
		 *
		 * @public
		 * @static
		 * @param {String} user - The identifier of the user to impersonate.
		 * @returns {Promise.<Endpoints>}
		 */
		static forDevelopment(user) {
			return EndpointBuilder.for('read-jwt-token-for-development', 'lookup user identity')
				.withVerb(VerbType.GET)
				.withProtocol(ProtocolType.HTTPS)
				.withHost(Configuration.developmentHost)
				.withPathBuilder((pb) => pb.withLiteralParameter('version', 'v1').withLiteralParameter('token', 'token'))
				.withQueryBuilder((qb) => qb.withLiteralParameter('user', 'userId', user))
				.withResponseInterceptor(ResponseInterceptor.DATA)
				.endpoint;
		}

		toString() {
			return '[JwtEndpoint]';
		}
	}

	return JwtEndpoint;
})();