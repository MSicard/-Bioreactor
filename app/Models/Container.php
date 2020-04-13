<?php

namespace App\Models;

use App\Classes\CazzRequest;
use Carbon\Carbon;
use Log;

class Container {
    static public function create($data) {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/container");
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestPost();
        return $cazzResponse;
    }

    static public function all() {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/container");
        $cazzResponse = $cazzRequest->requestGET();
        return $cazzResponse;
    }
}

?>