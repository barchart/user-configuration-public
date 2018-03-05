const JwtEndpoint = require('./gateway/jwt/JwtEndpoint'),
	UserConfigurationGateway = require('./gateway/UserConfigurationGateway');

module.exports = (() => {
	'use strict';

	return {
		JwtEndpoint: JwtEndpoint,
		UserConfigurationGateway: UserConfigurationGateway,
		version: '1.0.9'
	};
})();