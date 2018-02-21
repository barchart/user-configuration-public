const UserConfigurationGateway = require('./gateway/UserConfigurationGateway');

module.exports = (() => {
	'use strict';

	return {
		UserConfigurationGateway: UserConfigurationGateway,
		version: '1.0.4'
	};
})();