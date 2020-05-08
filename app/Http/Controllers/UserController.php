<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
use App\Models\User;
use Log;
use Session;

class UserController extends Controller
{

    public function show(Request $request)
    {
        $this->data['menu'] = 'User';

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
            'js/pages/user/index.js',
            'js/models/User.js'
        ];
        
    	return view('user.index', $this->data);
    }

    public function create(Request $request) {
        $code = 200;
        $response = User::create($request->json()->all());
        if (isset($response['code'])) {
            $code = $response['code'];
        }
        return response()->json($response, $code); 
    }


    public function all() {
        $code = 200;
        $response = User::all();
        if (isset($response['code'])) {
            $code = $response['code'];
        }

        return response()->json($response, $code);
    }

    public function delete(Request $request, $user) {
        $code = 200;
        $response = User::delete($user);
        if (isset($response['code'])) {
            $code = $response['code'];
        }

        return response()->json($response, $code);
    }
}