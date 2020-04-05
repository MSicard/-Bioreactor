<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
use Log;
use Session;

class BioReactorController extends Controller
{

    public function send(Request $request)
    {
        $code = 200;
        $data = $request->json()->all();
        Log::info($data);
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/weight");
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestPost();
        Log::info($cazzResponse);
        return response()->json($cazzResponse, 200);
    }
}