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
$json = getSubstitutePlan();
ini_set('html_errors', false);
error_reporting(0);
$count = array();
foreach ($json as $subDate) {
    $today = strtotime(date("d.m.Y"));
    $date = strtotime($subDate["date"]);
    if ($today == $date) {
        foreach ($subDate["subs"] as $sub) {
            if (array_key_exists($sub["class"], $count))
                $count[$sub["class"]]["day"]++;
            else
                $count[$sub["class"]] = array(
                    "day" => 1,
                    "week" => 0,
                    "all" => 0
                );
        }
    } else if ((date("W") == date("W", $date)) && (date("Y") == date("Y", $date))) {
        foreach ($subDate["subs"] as $sub) {
            if (array_key_exists($sub["class"], $count))
                $count[$sub["class"]]["week"]++;
            else
                $count[$sub["class"]] = array(
                    "day" => 0,
                    "week" => 1,
                    "all" => 0
                );
        }
    } else {
        foreach ($subDate["subs"] as $sub) {
            if (array_key_exists($sub["class"], $count))
                $count[$sub["class"]]["all"]++;
            else
                $count[$sub["class"]] = array(
                    "day" => 0,
                    "week" => 0,
                    "all" => 1
                );
        }
    }
}

function cmp($a, $b)
{
    $alen = strlen($a);
    $blen = strlen($b);
    if ($alen != $blen)
        return $alen > $blen;
    $anum = intval(preg_replace("/[^0-9,.]/", "", $a));
    $bnum = intval(preg_replace("/[^0-9,.]/", "", $b));
    if ($anum == $bnum) {
        $ac = preg_replace("/[0-9]+/", "", $a);
        $bc = preg_replace("/[0-9]+/", "", $b);
        return strnatcmp($ac, $bc);
    }
    return $a > $b;
}

uksort($count, "cmp");
$output = json_encode($count);
header('Content-Type: application/json');
header('Content-Length:' . strlen($output));
echo $output;