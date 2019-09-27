const JwtEndpoint = require('./gateway/jwt/JwtEndpoint'),
	JwtGateway = require('./gateway/jwt/JwtGateway');

const UserConfigurationGateway = require('./gateway/UserConfigurationGateway');

module.exports = (() => {
	'use strict';

	return {
		JwtEndpoint: JwtEndpoint,
		JwtGateway: JwtGateway,
		UserConfigurationGateway: UserConfigurationGateway,
		version: '1.3.8'
	};
})();