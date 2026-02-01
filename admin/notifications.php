<?php
global $meta_keys;
?>
<h2>Spin Notification Settings</h2>
<div class="spin-notification">
	<pre>
You can use following variables to fill dynamic values.<br>
<?php
foreach ($meta_keys as $meta_key) {
	echo sprintf( "<code>{{%s}}</code> ", $meta_key );
}
?> <code>{{home}}</code>
	</pre>
	<form method="post" action="options.php">
		<?php settings_fields( 'techeak_options_group' ); ?>
		<div>
			<label>
				Email from<br>
				<input type="email" name="notify_email_from" value="<?php echo get_option( 'notify_email_from' ); ?>">
			</label>
		</div>
		<div>
			<label>
				Name from<br>
				<input type="text" name="notify_email_from_name" value="<?php echo get_option( 'notify_email_from_name' ); ?>">
			</label>
		</div>
		<hr>
		<div>
			<label>
				<input type="checkbox" name="notify_to_admin" <?php echo ( get_option( 'notify_to_admin' ) ) ? 'checked' : ''; ?>> Email to Admin
			</label>
		</div>
		<div>
			<label>
				Subject<br>
				<input type="text" name="notify_to_admin_subject" value="<?php echo get_option( 'notify_to_admin_subject' ); ?>">
			</label>
		</div>
		<div>
			<label>
				Email to<br>
				<input type="text" name="notify_to_admin_to_email" value="<?php echo get_option( 'notify_to_admin_to_email' ); ?>">
			</label>
		</div>
		<div>
			<label>
				Email body<br>
			</label>
			<?php wp_editor(
				get_option( 'notify_to_admin_body' ),
				'notify_to_admin_body',
				[
					'tinymce' => [
						'width' => 500,
						'textarea_rows' => 8
					],
					//'editor_height' => 200,
    				'textarea_rows' => 6
				]
			); ?>
			
		</div>
		<hr>
		<div>
			<label>
				<input type="checkbox" name="notify_to_user" <?php echo ( get_option( 'notify_to_user' ) ) ? 'checked' : ''; ?>> Email to user
			</label>
		</div>
		<div>
			<label>
				Subject<br>
				<input type="text" name="notify_to_user_subject" value="<?php echo get_option( 'notify_to_user_subject' ); ?>">
			</label>
		</div>
		<div>
			<label>
				Email to<br>
				<input type="text" name="notify_to_user_to_email" value="<?php echo get_option( 'notify_to_user_to_email', '{{email}}' ); ?>">
			</label>
		</div>
		<div>
			<label>
				Email body<br>
			</label>
			<?php wp_editor(
				get_option( 'notify_to_user_body' ),
				'notify_to_user_body',
				[
					'tinymce' => [
						'width' => 500,
					],
					//'editor_height' => 200,
    				'textarea_rows' => 6
				]
			); ?>
			
		</div>
		<?php submit_button(); ?>
	</form>
</div>
<style type="text/css">
	.spin-notification input[type="email"],
	.spin-notification input[type="text"],
	.spin-notification textarea,
	.wp-editor-wrap {
		width: 500px;
	}
</style>