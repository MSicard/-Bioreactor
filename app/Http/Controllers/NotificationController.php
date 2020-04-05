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
        $code = 200;
        $response = 'HOLA MARITZA';
        $data = $request->json()->all();
        Log::info($data['message']);
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/notification");
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestPost();
        Log::info($cazzResponse);
        return response()->json($response, 200);
    }
}