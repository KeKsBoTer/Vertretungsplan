<?php

include("Authorization.php");

class NotificationRequests
{
    public $handle;

    public function __construct()
    {
        $this->handle = curl_multi_init();
    }

    public function process($bodies)
    {
        foreach ($bodies as $body) {
            $ch = curl_init("https://fcm.googleapis.com/fcm/send");
            $headers = array(
                'Authorization:key=' . api_key,//Server key from firebase
                'Content-Type:application/json',
                'content-length:' . strlen(json_encode($body))
            );
            curl_setopt_array($ch, array(
                CURLOPT_POST => 1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_HTTPHEADER => $headers,
                CURLOPT_POSTFIELDS => json_encode($body),
            ));
            curl_setopt_array($ch, array(CURLOPT_RETURNTRANSFER => TRUE));
            curl_multi_add_handle($this->handle, $ch);
        }
        do {
            $mrc = curl_multi_exec($this->handle, $active);
            if ($state = curl_multi_info_read($this->handle)) {
                curl_multi_remove_handle($this->handle, $state['handle']);
            }
            usleep(10000); // stop wasting CPU cycles and rest for a couple ms
        } while ($mrc == CURLM_CALL_MULTI_PERFORM || $active);
    }

    public function __destruct()
    {
        curl_multi_close($this->handle);
    }
}