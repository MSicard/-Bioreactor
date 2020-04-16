<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
use App\Models\Container;
use Log;
use Session;

class ContainerController extends Controller
{

    public function show(Request $request)
    {
        $this->data['menu'] = 'Container';

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
            'js/pages/container/index.js',
            'js/models/Container.js'
        ];
        
    	return view('container.index', $this->data);
    }

    public function create(Request $request) {
        $code = 200;
        $response = Container::create($request->json()->all());
        if (isset($response['code'])) {
            $code = $response['code'];
        }
        return response()->json($response, $code); 
    }


    public function all() {
        $code = 200;
        $response = Container::all();
        if (isset($response['code'])) {
            $code = $response['code'];
        }

        return response()->json($response, $code);
    }

    public function update(Request $request, $container) {
        $code = 200;
        $response = Container::update($container, $request->json()->all());
        if (isset($response['code'])) {
            $code = $response['code'];
        }
        return response()->json($response, $code);
    }
}