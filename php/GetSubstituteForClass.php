<?php
/**
 * Created by PhpStorm.
 * User: Simon
 * Date: 17.04.2017
 * Time: 22:51
 */
require('Utils.php');
date_default_timezone_set("Europe/London");
error_reporting(0);
$className = $_GET["class"];
$hash = $_GET["hash"];
if (empty($className))
    $className = "5A";
if (empty($hash))
    $hash = "";

$json = getSubstitutePlan();

$response = array();
foreach (array_keys($json) as $date) {
    $dateF = date("d.m.Y", strtotime($date));
    foreach (array_keys($json[$date]) as $class) {
        if ($class == $className) {
            $response[$dateF]=$json[$date][$class];
        }
    }
}
//$response["hash"] =  $hash ." / ". md5($output);
$output = json_encode($response);
header('Content-Type: application/json');
if ($hash == md5($output)) {
    $output = "[]";
}
header('Content-Length:' . strlen($output));
echo $output;