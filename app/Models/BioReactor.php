<?php

namespace App\Models;

use App\Classes\CazzRequest;
use Carbon\Carbon;
use Log;

class BioReactor {
    static public function getByTime($data) {
        Log::info($data);
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/weight");
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestGET();
        return $cazzResponse;
    }
}
