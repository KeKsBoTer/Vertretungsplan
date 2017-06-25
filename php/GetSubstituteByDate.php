<?php
/**
 * Created by PhpStorm.
 * User: A642383
 * Date: 19.04.2017
 * Time: 11:47
 * @param $contents
 * @return string
 */
require('Utils.php');
$json = getSubstitutePlan();
$output = json_encode($json);
header('Content-Type: application/json');
header('Content-Length:' . strlen($output));
echo $output;
