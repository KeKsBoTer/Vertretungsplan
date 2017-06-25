<?php
/**
 * Created by PhpStorm.
 * User: Simon
 * Date: 20.04.2017
 * Time: 00:39
 */
function getSubstitutePlan()
{
    $string = file_get_contents("./data.json");
    $json = json_decode($string, true);
    return $json;
}

/**
 * Compares two strings of class names e.g. "5A" and "10B"
 * First the grade is compared, if it is equal the class names are sorted alphabetical.
 * @param $a string First value to compare
 * @param $b string Second value to compare
 * @return bool|int class a > class b
 */
function classCmp($a, $b)
{
    $aLen = strlen($a);
    $bLen = strlen($b);
    if ($aLen != $bLen)
        return $aLen > $bLen;
    $aNum = intval(preg_replace("/[^0-9,.]/", "", $a));
    $bNum = intval(preg_replace("/[^0-9,.]/", "", $b));
    if ($aNum == $bNum) {
        $ac = preg_replace("/[0-9]+/", "", $a);
        $bc = preg_replace("/[0-9]+/", "", $b);
        return strnatcmp($ac, $bc);
    }
    return $a > $b;
}
