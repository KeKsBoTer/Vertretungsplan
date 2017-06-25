<?php
/**
 * Created by IntelliJ IDEA.
 * User: Simon
 * Date: 23.05.2017
 * Time: 00:33
 */

require('simple_html_dom.php');
require('NotificationRequests.php');
require('Utils.php');

/**
 * Removes all extra characters and decodes the string
 * @param $str string
 * @return mixed|string cleaned string
 */
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


function downloadPlan()
{
    //parse html file to JSON object
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
        foreach ($rowData as $row => $tr) {
            $element[clean($tr[0])][] = array(
                "lesson" => clean($tr[2]),
                "room" => clean($tr[4]),
                "info" => clean($tr[5])
            );
        }
        if (count($element) > 0)
            $json[$dates[$i++]] = $element;
    }

    $newSubs = detectChanges($json);

    //send push notification to users
    sendNotifications($newSubs);

    //save new data to file data.json
    $file = fopen("./data.json", "w") or die("Unable to open file!");
    fwrite($file, json_encode($json));

    //save last execution time to file test.json
    date_default_timezone_set('Europe/Berlin');
    $file2 = fopen("./test.json", "w") or die("Unable to open file!");
    fwrite($file2, date('Y-m-d H:i:s'));

    fclose($file);
}

/**
 * The function takes a list of new substitutes and and sends new push notifications to Google-Firebase.
 * @param $newSubs array    JSON object, containing the new substitutes
 *                          e.g {"23.06.2017":{"6B":[{"lesson":"5","room":"020","info":"anstelle Klasse 5C (5. Std.)"}]}}
 */
function sendNotifications($newSubs)
{
    $bodies = array();
    foreach (array_keys($newSubs) as $date) {
        foreach (array_keys($newSubs[$date]) as $className) {
            foreach ($newSubs[$date][$className] as $sub) {
                //generating message string with pattern: "Am 30.1.2050, Stunde 4 im Raum 200"
                $message = "Am " . $date;
                $hasLessen = strlen($sub["lesson"]) > 0;
                $hasRoom = strlen($sub["room"]) > 0;
                if ($hasLessen || $hasRoom) {
                    $message .= ", ";
                    if ($hasLessen)
                        $message .= "Stunde " . $sub["lesson"];
                    if ($hasRoom)
                        $message .= " im Raum " . $sub["room"];
                }
                $bodies[] = array(
                    "to" => "/topics/" . $className,
                    "notification" => array(
                        "title" => "Vertretungsplan " . $className,
                        "body" => $message,
                        "sound" => "default",
                        "priority" => "default",
                        "icon" => "ic_stat_ic_notification"
                    ));
            }
        }
    }
    //make async http requests to stay in maximum execution time
    $asyncRequest = new NotificationRequests();
    $asyncRequest->process($bodies);
}

/**
 * Difference as JSON-object e.g. {"23.06.2017":{"6B":[{"lesson":"5","room":"020","info":"anstelle Klasse 5C (5. Std.)"}]}}
 * @param $new array The new data as json object
 * @return array the difference as json object
 */
function detectChanges($new)
{
    $current = json_decode(file_get_contents("./data.json"), true);
    if ($current == null)
        return $new;
    $difference = array();
    foreach (array_keys($new) as $date) {
        if (!array_key_exists($date, $current)) {
            $difference[$date] = $new[$date];
        } else {
            foreach (array_keys($new[$date]) as $className) {
                if (!array_key_exists($className, $current[$date])) {
                    $difference[$date][$className] = $new[$date][$className];
                } else {
                    $dif = array_udiff($new[$date][$className], $current[$date][$className], function ($a, $b) {
                        return $a !== $b;
                    });
                    if (count($dif) > 0)
                        $difference[$date][$className] = $dif;
                }
            }
        }
    }
    return $difference;
}

downloadPlan();