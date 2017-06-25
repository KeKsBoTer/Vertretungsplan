<?php

/**
 * Created by IntelliJ IDEA.
 * User: Simon
 * Date: 22.05.2017
 * Time: 23:53
 * Script returns all classes that currently have a entry in the substitute plan.
 * returns e.g. ["5A","5B","Q11"]
 */
require('Utils.php');

$json = getSubstitutePlan();
$array = array();
if (count($json) > 0)
    foreach ($json as $date) {
        foreach (array_keys($date) as $class) {
            if (!in_array($class, $array))
                array_push($array, $class);
        }
    }
usort($array, "classCmp");
$output = json_encode($array);
header('Content-Type: application/json');
header('Content-Length:' . strlen($output));
echo $output;
