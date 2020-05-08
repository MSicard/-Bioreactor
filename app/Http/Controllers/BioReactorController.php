<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
use App\Models\BioReactor;
use Log;
use Session;

class BioReactorController extends Controller
{

    public function send(Request $request)
    {
        $code = 200;
        $data = $request->json()->all();
        $data['user'] = session()->get('userInfo')['username'];
        $cazzRequest = new CazzRequest(env('API_GW_BASE_URL') . "/weight");
        $cazzRequest->setBody(json_encode($data));
        $cazzResponse = $cazzRequest->requestPost();
        if (isset($cazzResponse['code'])) {
            $code = $cazzResponse['code'];
        }
        return response()->json($cazzResponse, $code);
    }

    public function getByDay(Request $request)
    {
        $code = 200;
        $response = BioReactor::getByTime($request->json()->all());
        if (isset($response['code'])) {
            $code = $response['code'];
        }
        return response()->json($response, $code);
    }

    public function getByContainer(Request $request, $container) 
    {
        $code = 200;
        $response = BioReactor::getByContainer($request->json()->all(), $container);
        if (isset($response['code'])) {
            $code = $response['code'];
        }
        return response()->json($response, $code);
    }

    public function getByRestaurant(Request $request, $restaurant) 
    {
        $code = 200;
        $response = BioReactor::getByRestaurant($request->json()->all(), $restaurant);
        if (isset($response['code'])) {
            $code = $response['code'];
        }
        return response()->json($response, $code);
    }

}