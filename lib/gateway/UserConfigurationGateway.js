const assert = require('@barchart/common-js/lang/assert'),
	Disposable = require('@barchart/common-js/lang/Disposable'),
	Enum = require('@barchart/common-js/lang/Enum'),
	is = require('@barchart/common-js/lang/is');

const EndpointBuilder = require('@barchart/common-client-js/http/builders/EndpointBuilder'),
	Gateway = require('@barchart/common-client-js/http/Gateway'),
	ProtocolType = require('@barchart/common-client-js/http/definitions/ProtocolType'),
	RequestInterceptor = require('@barchart/common-client-js/http/interceptors/RequestInterceptor'),
	ResponseInterceptor = require('@barchart/common-client-js/http/interceptors/ResponseInterceptor'),
	VerbType = require('@barchart/common-client-js/http/definitions/VerbType');

module.exports = (() => {
	'use strict';

	/**
	 * Web service gateway for invoking user configuration data storage service.
	 *
	 * @public
	 * @param {String} protocol - The protocol to use (either HTTP or HTTPS).
	 * @param {String} host - The host name of the Watchlist web service.
	 * @param {Number} port - The TCP port number of the Watchlist web service.
	 * @param {RequestInterceptor=} requestInterceptor - A request interceptor used with each request (typically used to inject JWT tokens).
	 * @extends {Disposable}
	 */
	class UserConfigurationGateway extends Disposable {
		constructor(protocol, host, port, requestInterceptor) {
			super();

			this._started = false;
			this._startPromise = null;

			const protocolType = Enum.fromCode(ProtocolType, protocol.toUpperCase());

			let requestInterceptorToUse;

			if (requestInterceptor) {
				requestInterceptorToUse = requestInterceptor;
			} else {
				requestInterceptorToUse = RequestInterceptor.EMPTY;
			}

			this._readConfigurationEndpoint = EndpointBuilder.for('read-user')
				.withVerb(VerbType.GET)
				.withProtocol(protocolType)
				.withHost(host)
				.withPort(port)
				.withPathBuilder((pb) => pb.withLiteralParameter('v1').withLiteralParameter('user'))
				.withRequestInterceptor(requestInterceptorToUse)
				.withResponseInterceptor(ResponseInterceptor.DATA)
				.endpoint;

			this._writeConfigurationEndpoint = EndpointBuilder.for('write-user')
				.withVerb(VerbType.PUT)
				.withProtocol(protocolType)
				.withHost(host)
				.withPort(port)
				.withPathBuilder((pb) => pb.withLiteralParameter('v1').withLiteralParameter('user'))
				.withEntireBody()
				.withRequestInterceptor(requestInterceptorToUse)
				.endpoint;
		}

		/**
		 * Initializes the connection to the remote server and returns a promise
		 * containing the current instance.
		 *
		 * @public
		 * @returns {Promise.<UserConfigurationGateway>}
		 */
		start() {
			return Promise.resolve()
				.then(() => {
					if (this._startPromise === null) {
						this._startPromise = Promise.resolve()
							.then(() => {
								this._started = true;

								return this;
							}).catch((e) => {
								this._startPromise = null;

								throw e;
							});
					}

					return this._startPromise;
				});
		}

		/**
		 * Retrieves user configuration data from the remote server.
		 *
		 * @public
		 * @returns {Promise.<Object>}
		 */
		readConfiguration() {
			return Promise.resolve()
				.then(() => {
					checkStart.call(this);

					return Gateway.invoke(this._readConfigurationEndpoint);
				});
		}

		/**
		 * Instructs the remote server to save user configuration data.
		 *
		 * @public
		 * @param {Object} data
		 * @returns {Promise}
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
		 * Creates and starts a new {@link UserConfigurationGateway} for use in the development environment.
		 *
		 * @public
		 * @static
		 * @param {RequestInterceptor=|Promise.<RequestInterceptor>=} requestInterceptor - A request interceptor used with each request (typically used to inject JWT tokens).
		 * @returns {Promise.<UserConfigurationGateway>}
		 */
		static forDevelopment(requestInterceptor) {
			return Promise.resolve(requestInterceptor)
				.then((requestInterceptor) => {
					assert.argumentIsOptional(requestInterceptor, 'requestInterceptor', RequestInterceptor, 'RequestInterceptor');

					return start(new UserConfigurationGateway('https', '6q974cgbv4.execute-api.us-east-1.amazonaws.com/dev', 443, requestInterceptor));
				});
		}

		/**
		 * Creates and starts a new {@link UserConfigurationGateway} for use in the production environment.
		 *
		 * @public
		 * @static
		 * @param {RequestInterceptor=|Promise.<RequestInterceptor>=} requestInterceptor - A request interceptor used with each request (typically used to inject JWT tokens).
		 * @returns {Promise.<UserConfigurationGateway>}
		 */
		static forProduction(requestInterceptor) {
			return Promise.resolve(requestInterceptor)
				.then((requestInterceptor) => {
					assert.argumentIsOptional(requestInterceptor, 'requestInterceptor', RequestInterceptor, 'RequestInterceptor');

					return start(new UserConfigurationGateway('https', '6q974cgbv4.execute-api.us-east-1.amazonaws.com/dev', 443, requestInterceptor));
				});
		}
		
		_onDispose() {
			return;
		}
		
		toString() {
			return `[UserConfigurationGateway]`;
		}
	}

	function start(gateway) {
		return gateway.start()
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