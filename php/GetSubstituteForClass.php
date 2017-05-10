<?php
/**
 * Created by PhpStorm.
 * User: Simon
 * Date: 17.04.2017
 * Time: 22:51
 */
require('DownloadPlan.php');
date_default_timezone_set("Europe/London");
error_reporting(0);
$class = $_GET["class"];
$hash = $_GET["hash"];
if (empty($class))
    $class = "5A";
if (empty($hash))
    $hash = "";

$json = getSubstitutePlan();

$response = array();
$response["class"] = $class;
$response["subs"] = array();
foreach ($json as $subDate) {
    $date = date("d.m.Y", strtotime($subDate["date"]));
    foreach ($subDate["subs"] as $sub) {
        if ($sub["class"] == $class) {
            if (empty($response["subs"][$date])) {
                $response["subs"][$date] = array();
            }
            $response["subs"][$date]["subs"][] = array(
                "lesson" => $sub["lesson"],
                "room" => $sub["room"],
                "info" => $sub["info"]
            );
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