const version = require('./../../lib/index').version;

const JwtProvider = require('./../../lib/security/JwtProvider'),
	UserConfigurationGateway = require('./../../lib/gateway/UserConfigurationGateway');

module.exports = (() => {
	'use strict';

	var PageModel = function() {
		var that = this;

		that.gateway = null;

		that.user = ko.observable('113692067');
		that.data = ko.observable(null);

		that.connected = ko.observable(false);
		that.connecting = ko.observable(false);

		that.loaded = ko.computed(function() {
			return that.data() !== null;
		});

		that.console = ko.observableArray([ ]);

		that.clientVersion = ko.observable();

		that.activeTemplate = ko.observable('disconnected-template');

		that.canConnect = ko.computed(function() {
			return !that.connecting() && !that.connected();
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

			UserConfigurationGateway.forDevelopment(JwtProvider.forTest(that.user(), 'TGAM'))
				.then((gateway) => {
					that.gateway = gateway;

					that.connecting(false);
					that.connected(true);

					that.clientVersion(version);

					that.activeTemplate('console-template');

					return true;
				}).catch((e) => {
					console.log(e);

					writeConsoleObject(e);

					return false;
				}).then((started) => {
					if (started) {
						return that.readConfiguration(false);
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

			that.data(null);

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

					that.data(data);
				}).catch((e) => {
					writeConsoleText(action);
					writeConsoleText(e);

					that.data(null);
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