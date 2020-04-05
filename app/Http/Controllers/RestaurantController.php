<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
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
            'js/plugins/forms/validation/validate.min.js',
            'js/plugins/forms/selects/select2.min.js',
            'js/plugins/tables/datatables/datatables.min.js'
        ];

        $this->data['jsFiles_mix'] = [
            'js/pages/restaurant/index.js'
        ];
        
    	return view('restaurant.index', $this->data);
    }
}