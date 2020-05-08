<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
use App\Models\Restaurant;
use Log;
use Session;

class RestaurantController extends Controller
{

    public function show(Request $request)
    {
        $this->data['menu'] = 'Restaurant';

        $this->data['cssFilesExternal'] = [
        ];

        $this->data['jsFiles_standAlone'] = [
            'js/plugins/buttons/spin.min.js',
            'js/plugins/buttons/ladda.min.js',
            'js/plugins/forms/styling/switch.min.js',
            'js/plugins/forms/validation/validate.min.js',
            'js/plugins/forms/selects/select2.min.js',
            'js/plugins/tables/datatables/datatables.min.js'
        ];

        $this->data['jsFiles_mix'] = [
            'js/pages/restaurant/index.js',
            'js/models/Restaurant.js'
        ];
        
    	return view('restaurant.index', $this->data);
    }

    public function create(Request $request) {
        $code = 200;
        $response = Restaurant::create($request->json()->all());
        if (isset($response['code'])) {
            $code = $response['code'];
        }
        return response()->json($response, $code); 
    }


    public function all() {
        $code = 200;
        $response = Restaurant::all();
        if (isset($response['code'])) {
            $code = $response['code'];
        }

        return response()->json($response, $code);
    }

    public function update(Request $request, $restaurant) {
        $code = 200;
        $response = Restaurant::update($restaurant, $request->json()->all());
        if (isset($response['code'])) {
            $code = $response['code'];
        }
        return response()->json($response, $code);
    }
}