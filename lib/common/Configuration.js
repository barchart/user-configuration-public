module.exports = (() => {
	'use strict';

	/**
	 * Static configuration data.
	 *
	 * @public
	 * @ignore
	 */
	class Configuration {
		constructor() {

		}

		/**
		 * The hostname of the REST API for the development environment (intended for Barchart use only).
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get developmentHost() {
			return 'user-configuration-dev.aws.barchart.com';
		}

		/**
		 * The hostname of the REST API for the test environment (public use allowed).
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get testHost() {
			return 'user-configuration-test.aws.barchart.com';
		}

		/**
		 * The hostname of the REST API for the staging environment (public use allowed).
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get stagingHost() {
			return 'user-configuration-stage.aws.barchart.com';
		}

		/**
		 * The hostname of the REST API for the demo environment (intended for Barchart use only).
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get demoHost() {
			return 'user-configuration-demo.aws.barchart.com';
		}

		/**
		 * The hostname of the REST API for the admin environment.
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get adminHost() {
			return 'sgv9jp8b78.execute-api.us-east-1.amazonaws.com/admin';
		}

		/**
		 * The hostname of the REST API for the production environment (public use allowed).
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get productionHost() {
			return 'user-configuration.aws.barchart.com';
		}

		/**
		 * The hostname of REST API which generates impersonation tokens for non-secure
		 * test and demo environments.
		 *
		 * @public
		 * @static
		 * @returns {string}
		 */
		static get getJwtImpersonationHost() {
			return 'jwt-public-prod.aws.barchart.com';
		}

		toString() {
			return '[Configuration]';
		}
	}

	return Configuration;
})();
