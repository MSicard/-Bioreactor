<?php

namespace App\Models;

use App\Classes\CazzRequest;
use Carbon\Carbon;
use Log;

class User {
    static public function create($data) {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/user");
        Log::info($data);
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestPost();
        return $cazzResponse;
    }

    static public function all() {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/user");
        $cazzResponse = $cazzRequest->requestGET();
        return $cazzResponse;
    }

    static public function delete($user) {
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . '/user/' . $user);
        $cazzResponse = $cazzRequest->requestPOST();
        return $cazzResponse;
    }
}

?>