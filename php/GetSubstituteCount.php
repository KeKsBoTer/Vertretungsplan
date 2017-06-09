<?php
/**
 * Created by PhpStorm.
 * User: A642383
 * Date: 19.04.2017
 * Time: 11:47
 * @param $contents
 * @return string
 */
require('DownloadPlan.php');
$output = "[]";
if (isset($_GET["class"])) {
    $json = getSubstitutePlan();
    ini_set('html_errors', false);
    error_reporting(0);
    $count = array(
        "day" => 1,
        "week" => 0,
        "all" => 0
    );
    foreach ($json as $subDate) {
        $today = strtotime(date("d.m.Y"));
        $date = strtotime($subDate["date"]);
        if ($today == $date) {
            foreach ($subDate["subs"] as $sub) {
                if ($sub["class"]==$_GET["class"])
                    $count["day"]++;
            }
        } else if ((date("W") == date("W", $date)) && (date("Y") == date("Y", $date))) {
            foreach ($subDate["subs"] as $sub) {
                if ($sub["class"]==$_GET["class"])
                    $count["week"]++;
            }
        } else {
            foreach ($subDate["subs"] as $sub) {
                if ($sub["class"]==$_GET["class"])
                    $count["all"]++;
            }
        }
    }
    $output = json_encode($count);
}
header('Content-Type: application/json');
header('Content-Length:' . strlen($output));
echo $output;