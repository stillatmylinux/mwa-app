<?php


/**
 * @depreated This is way too slow to use
 * 
 */

// TODO get request by http accept: json/application

$url = 'http://midwestauction.local:10088/' . $_GET['request'];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: applicaton/json', 'Accept: application/json'));

curl_exec($ch);

