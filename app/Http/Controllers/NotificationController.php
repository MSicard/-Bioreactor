<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
use Log;
use Session;

class NotificationController extends Controller
{

    public function send(Request $request)
    {
        $data = $request->json()->all();
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/notification");
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestPost();
        return response()->json($response, 200);
    }
}