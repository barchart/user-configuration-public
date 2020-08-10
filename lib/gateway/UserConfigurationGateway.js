const assert = require('@barchart/common-js/lang/assert'),
	Disposable = require('@barchart/common-js/lang/Disposable'),
	Enum = require('@barchart/common-js/lang/Enum');

const EndpointBuilder = require('@barchart/common-js/api/http/builders/EndpointBuilder'),
	Gateway = require('@barchart/common-js/api/http/Gateway'),
	ProtocolType = require('@barchart/common-js/api/http/definitions/ProtocolType'),
	ErrorInterceptor = require('@barchart/common-js/api/http/interceptors/ErrorInterceptor'),
	RequestInterceptor = require('@barchart/common-js/api/http/interceptors/RequestInterceptor'),
	ResponseInterceptor = require('@barchart/common-js/api/http/interceptors/ResponseInterceptor'),
	VerbType = require('@barchart/common-js/api/http/definitions/VerbType');

const Configuration = require('./../common/Configuration'),
	JwtProvider = require('../security/JwtProvider');

module.exports = (() => {
	'use strict';

	const REST_API_SECURE_PROTOCOL = 'https';
	const REST_API_SECURE_PORT = 443;
	
	/**
	 * The **central component of the SDK**. It is responsible for connecting to Barchart's
	 * User Preference Service.
	 *
	 * @public
	 * @param {String} protocol - The protocol of the of the User Preference web service (either HTTP or HTTPS).
	 * @param {String} host - The hostname of the User Preference web service.
	 * @param {Number} port - The TCP port number of the User Preference web service.
	 * @param {String} environment - A description of the environment we're connecting to.
	 * @extends {Disposable}
	 */
	class UserConfigurationGateway extends Disposable {
		constructor(protocol, host, port, environment) {
			super();

			this._environment = environment;

			this._started = false;
			this._startPromise = null;

			this._jwtProvider = null;

			const requestInterceptor = RequestInterceptor.fromDelegate((options, endpoint) => {
				return Promise.resolve()
					.then(() => {
						return this._jwtProvider.getToken()
							.then((token) => {
								options.headers = options.headers || {};
								options.headers.Authorization = `Bearer ${token}`;

								return options;
							});
					}).catch((e) => {
						const failure = FailureReason.forRequest({ endpoint: endpoint })
							.addItem(FailureType.REQUEST_IDENTITY_FAILURE)
							.format();

						return Promise.reject(failure);
					});
			});

			const protocolType = Enum.fromCode(ProtocolType, protocol.toUpperCase());

			this._readConfigurationEndpoint = EndpointBuilder.for('read-user-preferences', 'read your preferences')
				.withVerb(VerbType.GET)
				.withProtocol(protocolType)
				.withHost(host)
				.withPort(port)
				.withPathBuilder((pb) =>
					pb.withLiteralParameter('version', 'v1')
						.withLiteralParameter('user', 'user')
				)
				.withRequestInterceptor(requestInterceptor)
				.withResponseInterceptor(ResponseInterceptor.DATA)
				.withErrorInterceptor(ErrorInterceptor.GENERAL)
				.endpoint;

			this._writeConfigurationEndpoint = EndpointBuilder.for('write-user-preferences', 'save your preferences')
				.withVerb(VerbType.PUT)
				.withProtocol(protocolType)
				.withHost(host)
				.withPort(port)
				.withPathBuilder((pb) =>
					pb.withLiteralParameter('version', 'v1')
						.withLiteralParameter('user', 'user')
				)
				.withBody('user preference data')
				.withRequestInterceptor(requestInterceptor)
				.withErrorInterceptor(ErrorInterceptor.GENERAL)
				.endpoint;
		}

		/**
		 * A description of the environment (e.g. development, production, etc).
		 *
		 * @public
		 * @return {String}
		 */
		get environment() {
			return this._environment;
		}

		/**
		 * Attempts to establish a connection to the backend. This function should be invoked
		 * immediately following instantiation. Once the resulting promise resolves, a
		 * connection has been established and other instance methods can be used.
		 *
		 * @public
		 * @param {JwtProvider} jwtProvider
		 * @returns {Promise<UserConfigurationGateway>}
		 */
		connect(jwtProvider) {
			return Promise.resolve()
				.then(() => {
					assert.argumentIsRequired(jwtProvider, 'jwtProvider', JwtProvider, 'JwtProvider');

					if (this._startPromise === null) {
						this._startPromise = Promise.resolve()
							.then(() => {
								this._started = true;

								this._jwtProvider = jwtProvider;

								return this;
							}).catch((e) => {
								this._started = false;
								this._startPromise = null;

								this._jwtProvider = null;

								throw e;
							});
					}

					return this._startPromise;
				});
		}

		/**
		 * Retrieves user preferences from the remote service (for the current user).
		 *
		 * @public
		 * @returns {Promise<Schema.UserConfiguration>}
		 */
		readConfiguration() {
			return Promise.resolve()
				.then(() => {
					checkStart.call(this);

					return Gateway.invoke(this._readConfigurationEndpoint);
				});
		}

		/**
		 * Saves user preferences data to the remote service  (for the current user).
		 *
		 * @public
		 * @param {Schema.UserConfiguration} data
		 * @returns {Promise<Schema.UserConfiguration>}
		 */
		writeConfiguration(data) {
			return Promise.resolve()
				.then(() => {
					assert.argumentIsRequired(data, 'data', Object);

					checkStart.call(this);

					return Gateway.invoke(this._writeConfigurationEndpoint, data);
				});
		}

		/**
		 * Creates and starts a new {@link UserConfigurationGateway} for use in the public test environment.
		 *
		 * @public
		 * @static
		 * @param {JwtProvider} jwtProvider
		 * @returns {Promise<UserConfigurationGateway>}
		 */
		static forTest(jwtProvider) {
			return Promise.resolve()
				.then(() => {
					assert.argumentIsRequired(jwtProvider, 'jwtProvider', JwtProvider, 'JwtProvider');

					return start(new UserConfigurationGateway(REST_API_SECURE_PROTOCOL, Configuration.testHost, REST_API_SECURE_PORT, 'test'), jwtProvider);
				});
		}

		/**
		 * Creates and starts a new {@link UserConfigurationGateway} for use in the private development environment.
		 *
		 * @public
		 * @static
		 * @param {JwtProvider} jwtProvider
		 * @returns {Promise<UserConfigurationGateway>}
		 */
		static forDevelopment(jwtProvider) {
			return Promise.resolve()
				.then(() => {
					assert.argumentIsRequired(jwtProvider, 'jwtProvider', JwtProvider, 'JwtProvider');

					return start(new UserConfigurationGateway(REST_API_SECURE_PROTOCOL, Configuration.developmentHost, REST_API_SECURE_PORT, 'development'), jwtProvider);
				});
		}

		/**
		 * Creates and starts a new {@link UserConfigurationGateway} for use in the private staging environment.
		 *
		 * @public
		 * @static
		 * @param {JwtProvider} jwtProvider
		 * @returns {Promise<UserConfigurationGateway>}
		 */
		static forStaging(jwtProvider) {
			return Promise.resolve()
				.then(() => {
					assert.argumentIsRequired(jwtProvider, 'jwtProvider', JwtProvider, 'JwtProvider');

					return start(new UserConfigurationGateway(REST_API_SECURE_PROTOCOL, Configuration.stagingHost, REST_API_SECURE_PORT, 'staging'), jwtProvider);
				});
		}

		/**
		 * Creates and starts a new {@link UserConfigurationGateway} for use in the private demo environment.
		 *
		 * @public
		 * @static
		 * @param {JwtProvider} jwtProvider
		 * @returns {Promise<UserConfigurationGateway>}
		 */
		static forDemo(jwtProvider) {
			return Promise.resolve()
				.then(() => {
					assert.argumentIsRequired(jwtProvider, 'jwtProvider', JwtProvider, 'JwtProvider');

					return start(new UserConfigurationGateway(REST_API_SECURE_PROTOCOL, Configuration.demoHost, REST_API_SECURE_PORT, 'demo'), jwtProvider);
				});
		}

		/**
		 * Creates and starts a new {@link UserConfigurationGateway} for use in the public production environment.
		 *
		 * @public
		 * @static
		 * @param {JwtProvider} jwtProvider
		 * @returns {Promise<UserConfigurationGateway>}
		 */
		static forProduction(jwtProvider) {
			return Promise.resolve()
				.then(() => {
					assert.argumentIsRequired(jwtProvider, 'jwtProvider', JwtProvider, 'JwtProvider');

					return start(new UserConfigurationGateway(REST_API_SECURE_PROTOCOL, Configuration.productionHost, REST_API_SECURE_PORT, 'production'), jwtProvider);
				});
		}
		
		_onDispose() {
			return;
		}
		
		toString() {
			return `[UserConfigurationGateway]`;
		}
	}

	function start(gateway, jwtProvider) {
		return gateway.connect(jwtProvider)
			.then(() => {
				return gateway;
			});
	}

	function checkStart() {
		if (this.getIsDisposed()) {
			throw new Error('Unable to use gateway, the gateway has been disposed.');
		}

		if (!this._started) {
			throw new Error('Unable to use gateway, the gateway has not started.');
		}
	}

 	return UserConfigurationGateway;
})();