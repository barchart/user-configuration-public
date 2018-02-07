const JwtGateway = require('@barchart/jwt-tgam-js/lib/JwtGateway');

module.exports = (() => {
	'use strict';

	window.Barchart = window.Barchart || { };
	window.Barchart.Jwt = window.Barchart.Jwt || { };
	window.Barchart.Jwt.JwtProvider = JwtGateway;
})();