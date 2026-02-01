<?php
/**
 * Plugin Name:       Spin Wheel
 * Description:       Engage your visitors with an interactive spinning wheel that offers coupons and other rewards. Increase user engagement and boost conversions with this fun and rewarding experience.
 * Version:           1.0.10
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Bilal Aziz
 * Author URI:        http://upwork.com/fl/belalmian
 * Text Domain:       spin-wheel
 * Domain Path:       /languages

 */

/**
 * Prevent direct access
 */
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

define( 'SPIN_WHEEL_VERSION', '1.0.10' );

define( 'SPIN_WHEEL__FILE__', __FILE__ );
define( 'SPIN_WHEEL_PATH', plugin_dir_path( SPIN_WHEEL__FILE__ ) );
define( 'SPIN_WHEEL_INCLUDES', SPIN_WHEEL_PATH . 'includes/' );
define( 'SPIN_WHEEL_URL', plugins_url( '/', SPIN_WHEEL__FILE__ ) );
define( 'SPIN_WHEEL_PATH_NAME', basename( dirname( SPIN_WHEEL__FILE__ ) ) );
define( 'SPIN_WHEEL_INC_PATH', SPIN_WHEEL_PATH . 'includes/' );
define( 'SPIN_WHEEL_ASSETS', SPIN_WHEEL_URL . 'assets/' );
define( 'SPIN_WHEEL_ASSETS_URL_ADMIN', SPIN_WHEEL_URL . 'assets/admin/' );

/**
 * Loads translations
 *
 * @return void
 */

if ( ! function_exists( 'spin_wheel_load_textdomain' ) ) {
	function spin_wheel_load_textdomain() {
		load_plugin_textdomain( 'spin-wheel', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}
	add_action( 'init', 'spin_wheel_load_textdomain' );
}

/**
 * Is Pro Activated
 */

if ( ! function_exists( 'spin_wheel_is_pro_activated' ) ) {
	function spin_wheel_is_pro_activated() {
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$file_path = 'spin-wheel-pro/spin-wheel-pro.php';

		if ( is_plugin_active( $file_path ) ) {
			return true;
		}

		return false;
	}
}

/**
 * Installer
 *
 * @since 1.0.0
 */
require_once SPIN_WHEEL_INCLUDES . 'class-installer.php';

add_action( 'init', function () {
	require_once SPIN_WHEEL_INCLUDES . 'App/class-routes.php';
	new \SPIN_WHEEL\App\Routes\Routes();
} );

/**
 * The main function responsible for returning the one true DCI instance to functions everywhere
 * Responsible for Installer, Updater, and Initiator
 */

if ( ! function_exists( 'spin_wheel_app' ) ) {

	/**
	 * Init the Plugin
	 *
	 * @since 1.0.0
	 */
	function spin_wheel_app() {

		function spin_wheel_activate() {
			$installer = new SPIN_WHEEL\Installer();
			$installer->run();
		}

		function spin_wheel_init_plugin() {

			require_once SPIN_WHEEL_PATH . '/class-core.php';
			\SPIN_WHEEL\Core::instance();

			require_once SPIN_WHEEL_PATH . '/plugin.php';

			if ( is_admin() ) {
				require_once SPIN_WHEEL_PATH . '/includes/class-admin.php';
				new \SPIN_WHEEL\Admin();
			}
		}

		function spin_wheel_upgrade() {
			$installer = new SPIN_WHEEL\Installer();
			$installer->update_tables();
		}

		function spin_wheel_upgrader_process_complete( $upgrader_object, $options ) {
			if ( $options['action'] == 'update' && $options['type'] == 'plugin' ) {
				/**
				 * Check if the plugin being updated is this one
				 */
				if ( isset( $options['plugins'] ) && in_array( plugin_basename( __FILE__ ), $options['plugins'] ) ) {
					spin_wheel_upgrade();
				}
			}
		}

		register_activation_hook( __FILE__, 'spin_wheel_activate' );
		add_action( 'plugins_loaded', 'spin_wheel_init_plugin' );
		add_action( 'upgrader_process_complete', 'spin_wheel_upgrader_process_complete', 10, 2 );
	}

	/**
	 * Kick-off the plugin.
	 */
	spin_wheel_app();

	/**
	 * SDK Integration
	 */

	if ( ! function_exists( 'spin_wheel_dci_plugin' ) ) {
		function spin_wheel_dci_plugin() {

			// Include DCI SDK.
			require_once dirname( __FILE__ ) . '/dci/start.php';
			wp_register_style( 'dci-sdk-spin_wheel', plugins_url( 'dci/assets/css/dci.css', __FILE__ ), array(), '1.2.1', 'all' );
			wp_enqueue_style( 'dci-sdk-spin_wheel' );

			dci_dynamic_init( array(
				'sdk_version'          => '1.2.1',
				'product_id'           => 8,
				'plugin_name'          => 'Spin Wheel', // make simple, must not empty
				'plugin_title'         => 'Love using Spin Wheel? Congrats 🎉  ( Never miss an Important Update )',
				'plugin_icon'          => SPIN_WHEEL_ASSETS . 'imgs/logo.svg', // delete the line of you don't need
				'api_endpoint'         => 'https://analytics.bdthemes.com/wp-json/dci/v1/data-insights',
				'slug'                 => 'spin-wheel', // write 'no-need' if you don't want to use
				'core_file'            => false,
				'plugin_deactivate_id' => false,
				'menu'                 => array(
					'slug' => 'spin-wheel',
				),
				'public_key'           => 'pk_BaOBTg4cNDCrgyvnyJHH0JZNsXTfcAaF',
				'is_premium'           => false,
				'popup_notice'         => false,
				'deactivate_feedback'  => true,
				'plugin_msg'           => '<p>Be Top-contributor by sharing non-sensitive plugin data and create an impact to the global WordPress community today! You can receive valuable emails periodically.</p>',
			) );

		}
		add_action( 'admin_init', 'spin_wheel_dci_plugin' );
	}
}
