<?php
/**
 * Created by PhpStorm.
 * User: Simon
 * Date: 20.04.2017
 * Time: 00:39
 */
require('simple_html_dom.php');
function getSubstitutePlan()
{
    function clean($str)
    {
        $str = utf8_decode($str);
        html_entity_decode($str);
        $str = str_replace("&nbsp;", "", $str);
        $str = preg_replace("/\s+/", " ", $str);
        $str = trim($str);
        $str = html_entity_decode($str);
        return $str;
    }


    $html = file_get_html('https://dhg.ssl-secured-server.de/DHG/vplan/vplan.php');

    $elements = $html->find('a[name!=oben],table[class=k]');
    $tableData = array();
    $dates = array();
    $i = 0;
    $size = sizeof($elements);
    foreach ($elements as $table) {
        if ($table->tag == "table") {
            $rowData = array();
            $last = "";
            foreach (array_slice($table->find('tr'), 1) as $row) {
                // initialize array to store the cell data from each row
                $flight = array();
                $cells = $row->find('td,th');
                if (count($cells) < 6)
                    $flight[] = $last;
                else
                    $last = $cells[0]->plaintext;
                foreach ($cells as $cell) {
                    // push the cell's text to the array
                    $flight[] = $cell->plaintext;
                }
                $rowData[] = $flight;
            }
            $tableData[] = $rowData;
        } else {
            $dates[] = $table->name;
            if (($i + 1 < sizeof($elements) && $elements[$i + 1]->tag == "a") || $i + 1 == $size)
                $tableData[] = array();
        }
        $i++;
    }
    $i = 0;
    $json = array();
    foreach ($tableData as $rowData) {
        $element = array();
        $element["date"] = $dates[$i++];
        $subs = array();
        foreach ($rowData as $row => $tr) {
            $subs[] = array(
                "class" => clean($tr[0]),
                "lesson" => clean($tr[2]),
                "room" => clean($tr[4]),
                "info" => clean($tr[5])
            );
        }
        $element["subs"] = $subs;
        $json[] = $element;
    }
    return $json;
}