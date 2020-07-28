const assert = require('@barchart/common-js/lang/assert'),
	Disposable = require('@barchart/common-js/lang/Disposable'),
	Scheduler = require('@barchart/common-js/timing/Scheduler');

const EndpointBuilder = require('@barchart/common-js/api/http/builders/EndpointBuilder'),
	Gateway = require('@barchart/common-js/api/http/Gateway'),
	ProtocolType = require('@barchart/common-js/api/http/definitions/ProtocolType'),
	ResponseInterceptor = require('@barchart/common-js/api/http/interceptors/ResponseInterceptor'),
	VerbType = require('@barchart/common-js/api/http/definitions/VerbType');

const Configuration = require('./../../common/Configuration');

module.exports = (() => {
	'use strict';

	/**
	 * Generates and caches a signed token (using a delegate). The cached token
	 * is refreshed periodically.
	 *
	 * @public
	 * @exported
	 * @param {Callbacks.JwtTokenGenerator} generator - An anonymous function which returns a signed JWT token.
	 * @param {Number} interval - The number of milliseconds which must pass before a new JWT token is generated.
	 */
	class JwtProvider extends Disposable {
		constructor(generator, interval) {
			super();

			assert.argumentIsRequired(generator, 'generator', Function);
			assert.argumentIsRequired(interval, 'interval', Number);

			this._generator = generator;
			this._interval = interval;

			this._tokenPromise = null;
			this._tokenTimestamp = null;

			this._scheduler = new Scheduler();
		}

		/**
		 * Reads the current token, refreshing if necessary.
		 *
		 * @public
		 * @returns {Promise<String>}
		 */
		getToken() {
			return Promise.resolve()
				.then(() => {
					const time = (new Date().getTime());

					if (this._tokenPromise === null || this._timestamp === null || (this._tokenTimestamp + this._interval) < time) {
						this._tokenTimestamp = time;

						this._tokenPromise  = this._scheduler.backoff(() => this._generator(), 100, 'Read JWT token', 3);
					}

					return this._tokenPromise;
				});
		}

		/**
		 * Builds a {@link JwtProvider} which will generate tokens impersonating the specified
		 * user. These tokens will only work in the "test" environment.
		 *
		 * Recall, the "test" environment is not "secure" -- any data saved here can be accessed
		 * by anyone (using this feature). Furthermore, data is periodically purged from the
		 * test environment.
		 *
		 * @public
		 * @static
		 * @param {String} userId - The user identifier to impersonate.
		 * @param {String} contextId - The context identifier of the user to impersonate.
		 * @param {String=} permissions - The desired permission level.
		 * @returns {JwtProvider}
		 */
		static forTest(userId, contextId, permissions) {
			return getJwtProviderForImpersonation(Configuration.testHost, userId, contextId, permissions);
		}

		/**
		 * Builds a {@link JwtProvider} which will generate tokens impersonating the specified
		 * user. The "development" environment is for Barchart use only and access is restricted
		 * to Barchart's internal network.
		 *
		 * @public
		 * @static
		 * @param {String} userId - The user identifier to impersonate.
		 * @param {String} contextId - The context identifier of the user to impersonate.
		 * @param {String=} permissions - The desired permission level.
		 * @returns {JwtProvider}
		 */
		static forDevelopment(userId, contextId, permissions) {
			return getJwtProviderForImpersonation(Configuration.developmentHost, userId, contextId, permissions);
		}

		_onDispose() {
			this._scheduler.dispose();
			this._scheduler = null;
		}

		toString() {
			return '[JwtProvider]';
		}
	}

	function getJwtProviderForImpersonation(host, userId, contextId, permissions) {
		assert.argumentIsRequired(host, 'host', String);
		assert.argumentIsRequired(userId, 'userId', String);
		assert.argumentIsRequired(contextId, 'contextId', String);
		assert.argumentIsOptional(permissions, 'permissions', String);

		const tokenEndpoint = EndpointBuilder.for('generate-impersonation-jwt-for-test', 'generate JWT token for test environment')
			.withVerb(VerbType.GET)
			.withProtocol(ProtocolType.HTTPS)
			.withHost(host)
			.withPathBuilder((pb) =>
				pb.withLiteralParameter('version', 'v1')
					.withLiteralParameter('token', 'token')
			)
			.withQueryBuilder((qb) =>
				qb.withVariableParameter('userId', 'userId', 'userId', false)
					.withVariableParameter('contextId', 'contextId', 'contextId', false)
					.withVariableParameter('permissions', 'permissions', 'permissions', true)
			)
			.withResponseInterceptor(ResponseInterceptor.DATA)
			.endpoint;

		const payload = { };

		payload.userId = userId;
		payload.contextId = contextId;

		if (permissions) {
			payload.permissions = permissions;
		}

		return new JwtProvider(() => Gateway.invoke(tokenEndpoint, payload), 5 * 60 * 1000);
	}

	return JwtProvider;
})();