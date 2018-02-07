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
	 * @extends {Disposable}
	 */
	class UserConfigurationGateway extends Disposable {
		constructor() {
			super();

			this._started = false;
			this._startPromise = null;

			this._readConfigurationEndpoint = null;
			this._writeConfigurationEndpoint = null;
		}

		/**
		 * Initializes the connection to the remote server and returns a promise.
		 *
		 * @public
		 * @param {String} protocol - The protocol to use (either HTTP or HTTPS).
		 * @param {String} host - The host name of the Watchlist web service.
		 * @param {Number} port - The TCP port number of the Watchlist web service.
		 * @param {RequestInterceptor=} requestInterceptor - A request interceptor used with each request (typically used to inject JWT tokens).
		 * @returns {Promise.<Boolean>}
		 */
		start(protocol, host, port, requestInterceptor) {
			return Promise.resolve()
				.then(() => {
					if (this._startPromise === null) {
						assert.argumentIsRequired(protocol, 'protocol', String);
						assert.argumentIsRequired(host, 'host', String);
						assert.argumentIsRequired(port, 'port', Number);
						assert.argumentIsOptional(requestInterceptor, 'requestInterceptor', RequestInterceptor, 'RequestInterceptor');
						
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

						this._started = true;
						
						return this._started;
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

		_onDispose() {
			return;
		}
		
		toString() {
			return `[UserConfigurationGateway]`;
		}
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