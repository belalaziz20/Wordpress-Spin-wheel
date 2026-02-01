<?php
add_action( 'manage_posts_extra_tablenav', function ( $which ) {
    global $typenow;
  
    if ( 'form_entries' === $typenow && 'top' === $which ) {
        ?>
        <input type="submit" name="export_all_form_entries" class="button button-primary" value="<?php _e('Export All Entries'); ?>" />
        <?php
    }
}, 20, 1 );
add_action( 'init', function () {
	$meta_keys = [
		'name',
		'email',
		'phone',
		'state',
		'country',
		'win',
		'total_win',
		'token'
	];
	$heads = [];
	foreach ($meta_keys as $meta_key) {
		$heads[] = ucwords( str_replace('_', ' ', $meta_key ) );
	}
    if(isset($_GET['export_all_form_entries'])) {
        $arg = array(
            'post_type' => 'form_entries',
            'post_status' => 'any',
            'posts_per_page' => -1,
        );
        global $post;
        $arr_post = get_posts($arg);
        if ($arr_post) {
            header('Content-type: text/csv');
            header('Content-Disposition: attachment; filename="entries.csv"');
            header('Pragma: no-cache');
            header('Expires: 0');
            $file = fopen('php://output', 'w');
            fputcsv( $file, $heads );
            foreach ($arr_post as $post) {
                setup_postdata($post);
                $postData = [];
                foreach ( $meta_keys as $meta_key ) {
					$postData[] = get_post_meta( get_the_ID(), $meta_key, true );
				}
                fputcsv( $file, $postData );
            }
            exit();
        }
    }
} );