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
$output = "[]";
if (isset($_GET["class"])) {
    $json = getSubstitutePlan();
    ini_set('html_errors', false);
    error_reporting(0);
    $count = array(
        "day" => 0,
        "week" => 0,
        "all" => 0
    );
    foreach (array_keys($json) as $dateStr) {
        $today = strtotime(date("d.m.Y"));
        $date = strtotime($dateStr);
        if ($today == $date) {
            foreach (array_keys($json[$dateStr]) as $class) {
                if ($class==$_GET["class"])
                    $count["day"]+=count($json[$dateStr][$class]);
            }
        } else if ((date("W") == date("W", $date)) && (date("Y") == date("Y", $date))) {
            foreach (array_keys($json[$dateStr]) as $class) {
                if ($class==$_GET["class"])
                    $count["week"]+=count($json[$dateStr][$class]);
            }
        } else {
            foreach (array_keys($json[$dateStr]) as $class) {
                if ($class==$_GET["class"])
                    $count["all"]+=count($json[$dateStr][$class]);
            }
        }
    }
    $output = json_encode($count);
}
header('Content-Type: application/json');
header('Content-Length:' . strlen($output));
echo $output;