const version = require('./../../lib/index').version;

const JwtProvider = require('./../../lib/security/JwtProvider'),
	UserConfigurationGateway = require('./../../lib/gateway/UserConfigurationGateway');

(() => {
	'use strict';

	var PageModel = function() {
		var that = this;

		that.gateway = null;

		that.connected = ko.observable(false);
		that.connecting = ko.observable(false);

		that.context = ko.observable('barchart');

		that.user = ko.observable('113692067');
		that.userDescription = ko.observable(null);

		that.environment = ko.observable('test');
		that.environmentDescription = ko.observable(null);

		that.preferences = ko.observable(null);

		that.console = ko.observableArray([ ]);
		that.version = ko.observable({ });

		that.activeTemplate = ko.observable('disconnected-template');

		that.loaded = ko.computed(function() {
			return that.preferences() !== null;
		});

		that.canConnect = ko.computed(function() {
			return !that.connecting() && !that.connected() && (that.environment().toLowerCase() === 'dev' || that.environment().toLowerCase() === 'test');
		});
		that.canDisconnect = ko.computed(function() {
			return that.connected();
		});

		var writeConsoleText = function(text) {
			that.console.push(text);
		};

		var writeConsoleObject = function(data) {
			that.console.push(JSON.stringify(data, null, 2));
		};

		that.connect = function() {
			that.disconnect();

			that.connecting(true);

			let gatewayPromise;

			if (that.environment().toLowerCase() === 'dev') {
				gatewayPromise = UserConfigurationGateway.forDevelopment(JwtProvider.forDevelopment(that.user(), that.context()));
			} else if (that.environment().toLowerCase() === 'test') {
				gatewayPromise = UserConfigurationGateway.forTest(JwtProvider.forTest(that.user(), that.context()));
			} else {
				gatewayPromise = Promise.reject();
			}

			gatewayPromise.then((gateway) => {
				that.gateway = gateway;

				return gateway.readServiceMetadata()
					.then((data) => {
						that.version({ sdk: version, api: data.server.semver});

						that.userDescription(data.user.id + '@' + data.context.id);
						that.environmentDescription(that.gateway.environment);

						that.activeTemplate('console-template');

						return true;
					});
			}).catch((e) => {
				console.log(e);

				writeConsoleObject(e);

				return false;
			}).then((started) => {
				that.connecting(false);

				if (started) {
					that.connected(true);

					return that.readConfiguration(false);
				} else {
					that.disconnect();
				}
			});
		};
		that.disconnect = function() {
			if (that.gateway === null) {
				return;
			}

			if (that.gateway) {
				that.gateway.dispose();
				that.gateway = null;
			}

			that.console.removeAll();

			that.preferences(null);

			that.environmentDescription(null);
			that.userDescription(null);

			//that.version({ });

			that.connecting(false);
			that.connected(false);

			that.activeTemplate('disconnected-template');
		};

		that.readConfiguration = function(clear) {
			if (clear) {
				that.console.removeAll();
			}

			var action = 'userConfigurationGateway.readConfiguration()';

			return that.gateway.readConfiguration()
				.then(function(data) {
					writeConsoleText(action);
					writeConsoleObject(data);

					that.preferences(data);
				}).catch((e) => {
					writeConsoleText(action);
					writeConsoleText(e);

					that.preferences(null);
				});
		};

		that.handleLoginKeypress = function(d, e) {
			var enterKey = e.keyCode === 13;

			if (enterKey) {
				that.connect();
			}

			return !enterKey;
		};
	};

	$(document).ready(function() {
		var pageModel = new PageModel();

		ko.applyBindings(pageModel, $('body')[0]);
	});
})();