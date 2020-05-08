<?php

namespace App\Models;

use App\Classes\CazzRequest;
use Carbon\Carbon;
use Log;

class BioReactor {
    static public function getByTime($data) {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/weight");
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestGET();
        return $cazzResponse;
    }

    static public function getByContainer($data, $container) {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/container/" . $container);
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestGET();
        return $cazzResponse;
    }

    static public function getByRestaurant($data, $restaurant) {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/restaurant/" . $restaurant);
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestGET();
        return $cazzResponse;
    }
}
