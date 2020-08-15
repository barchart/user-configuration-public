const UserConfigurationGateway = require('./gateway/UserConfigurationGateway');

module.exports = (() => {
	'use strict';

	return {
		UserConfigurationGateway: UserConfigurationGateway,
		version: '2.2.0'
	};
})();