<?php

/**
 * Created by IntelliJ IDEA.
 * User: Simon
 * Date: 22.05.2017
 * Time: 23:53
 * Script returns all classes that currently have a entry in the substitute plan.
 * returns e.g. ["5A","5B","Q11"]
 */
require('DownloadPlan.php');

$json = getSubstitutePlan();
$array = array();
if (count($json) > 0)
    foreach ($json as $subDate) {
        foreach ($subDate["subs"] as $sub) {
            if (!in_array($sub["class"], $array))
                array_push($array, $sub["class"]);
        }
    }
usort($array, "classCmp");
$output = json_encode($array);
header('Content-Type: application/json');
//header('Content-Length:' . strlen($output));
echo $output;
