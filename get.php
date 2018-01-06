<?php
$urls = json_decode($_POST['urls']);
foreach ($urls as $url):
	$array = get_headers($url);
	$string = $array[0];
	if (strpos($string,"200")) {
	    echo $url;
	}
endforeach;
?>