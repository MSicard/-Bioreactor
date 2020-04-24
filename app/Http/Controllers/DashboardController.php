<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
use App\Models\Container;
use Log;
use Session;

class DashboardController extends Controller
{
    public function home()
    {
        $this->data['menu'] = 'Dashboard';
        $this->data['cssFilesExternal'] = [
        ];

        $this->data['jsFiles_standAlone'] = [
            'js/plugins/buttons/spin.min.js',
            'js/plugins/buttons/ladda.min.js',
            'js/plugins/forms/validation/validate.min.js',
            'js/plugins/forms/selects/select2.min.js',
            'js/plugins/visualization/echarts/echarts.min.js'
        ];

        $this->data['jsFiles_mix'] = [
            'js/models/Notification.js',
            'js/models/BioReactor.js',
            'js/pages/dashboard/home.js',
            'js/pages/dashboard/graphs.js'
        ];
        
        $this->data['container'] = '';

        $response = Container::all();
        
        if (!isset($response['code'])) {
            $this->data['container'] = $response;
        }

    	return view('layouts.home', $this->data);
    }
}