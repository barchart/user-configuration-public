module.exports = (() => {
	'use strict';

	/**
	 * Static configuration data.
	 *
	 * @public
	 */
	class Configuration {
		constructor() {

		}

		/**
		 * The host of the development system.
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get developmentHost() {
			return 'user-configuration-dev.aws.barchart.com';
		}

		/**
		 * The host of the staging system.
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get stagingHost() {
			return 'user-configuration-stage.aws.barchart.com';
		}

		/**
		 * The host of the demo system.
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get demoHost() {
			return 'user-configuration-demo.aws.barchart.com';
		}

		/**
		 * The host of the production system.
		 *
		 * @public
		 * @static
		 * @returns {String}
		 */
		static get productionHost() {
			return 'user-configuration.aws.barchart.com';
		}

		toString() {
			return '[Configuration]';
		}
	}

	return Configuration;
})();