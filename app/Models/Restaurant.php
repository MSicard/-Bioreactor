<?php

namespace App\Models;

use App\Classes\CazzRequest;
use Carbon\Carbon;
use Log;

class Restaurant {
    static public function create($data) {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/restaurant");
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestPost();
        return $cazzResponse;
    }

    static public function all() {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/restaurant");
        $cazzResponse = $cazzRequest->requestGET();
        return $cazzResponse;
    }

    static public function update($rfid, $data) {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/restaurant/" . $rfid);
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestPOST();
        return $cazzResponse;
    }
}

?>