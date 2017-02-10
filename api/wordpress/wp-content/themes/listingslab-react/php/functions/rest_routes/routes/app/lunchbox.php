<?php
/**
 * Add the Lunchbox information: to /app endpoint
 * http://api.healthylunchbox.com.au/wp-admin/edit.php?post_type=lunchbox_item
 */

  $lunchbox = new stdClass();
  // Get lunchbox categories and the items in them
  $cats = get_terms( array(
    'taxonomy' => 'lunchbox',
    'hide_empty' => false,
  ));
  if (!isset($cats->errors)) {
    $catArr = array ();
    for ($i = 0; $i < count($cats); $i++){
      $cat = new stdClass();
      $cat->catID = $cats[$i]->term_id;
      $cat->cat = $cats[$i];
      $cat->image = z_taxonomy_image_url($cat->catID);
      $cat->items = array();
      $posts = get_posts(array(
      'post_type' => 'lunchbox_item',
      'numberposts' => -1,
      'tax_query' => array(array(
          'taxonomy' => 'lunchbox',
          'field' => 'slug',
          'terms' => array($cat->cat->slug),
          'operator' => 'IN'
        ))
      ));
      for ($j = 0; $j < count($posts); $j++) {
        $post = new stdClass();
        $post->ID = $posts[$j]->ID;
        $post->acf = get_fields($post->ID);
        $post->post = get_post($post->ID);
        $cat->items[] = $post;
      }
      $catArr[] = $cat;
    }
  }
  $lunchbox->foodgroups = $catArr;
  $response->data->lunchbox = $lunchbox;
