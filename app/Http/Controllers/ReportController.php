<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
use App\Models\BioReactor;
use App\Models\Restaurant;
use App\Models\Container;
use App\Models\User;
use Log;
use Session;

class ReportController extends Controller
{
    public function show(Request $request)
    {
        $this->data['menu'] = 'Report';

        $this->data['cssFilesExternal'] = [
        ];

        $this->data['jsFiles_standAlone'] = [
            'js/plugins/buttons/spin.min.js',
            'js/plugins/buttons/ladda.min.js',
            'js/plugins/visualization/echarts/echarts.min.js',
            'js/plugins/tables/datatables/datatables.min.js',
            'js/plugins/tables/datatables/extensions/buttons.min.js',
            'js/plugins/tables/datatables/extensions/pdfmake/pdfmake.min.js',
            'js/plugins/tables/datatables/extensions/pdfmake/vfs_fonts.min.js',
            'js/plugins/ui/moment/moment.min.js',
            'js/plugins/pickers/daterangepicker.js'
        ];

        $this->data['jsFiles_mix'] = [
            'js/pages/report/index.js',
            'js/models/BioReactor.js'
        ];

        $this->data['restaurants'] = '';
        $this->data['users'] = '';
        $this->data['containers'] = '';

        $restaurant = Restaurant::all();
        $user = User::all();
        $container = Container::all();
        
        if (!isset($restaurant['code'])) {
            $this->data['restaurants'] = $restaurant;
        }
        if (!isset($user['code'])) {
            $this->data['users'] = $user;
        }
        if (!isset($container['code'])) {
            $this->data['containers'] = $container;
        }

    	return view('report.index', $this->data);
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

    public function container(Request $request, $container) 
    {
        $this->data['menu'] = 'Report';
        $this->data['container'] = $container;
        $this->data['cssFilesExternal'] = [
        ];

        $this->data['jsFiles_standAlone'] = [
            'js/plugins/buttons/spin.min.js',
            'js/plugins/buttons/ladda.min.js',
            'js/plugins/visualization/echarts/echarts.min.js',
            'js/plugins/tables/datatables/datatables.min.js',
            'js/plugins/tables/datatables/extensions/buttons.min.js',
            'js/plugins/tables/datatables/extensions/pdfmake/pdfmake.min.js',
            'js/plugins/tables/datatables/extensions/pdfmake/vfs_fonts.min.js',
            'js/plugins/ui/moment/moment.min.js',
            'js/plugins/pickers/daterangepicker.js'
        ];

        $this->data['jsFiles_mix'] = [
            'js/pages/report/container.js',
            'js/models/BioReactor.js'
        ];
        
        return view('report.container.container', $this->data);
    }

    public function restaurant(Request $request, $restaurant)
    {
        $this->data['menu'] = 'Report';
        $this->data['restaurant'] = $restaurant;

        $this->data['cssFilesExternal'] = [
        ];

        $this->data['jsFiles_standAlone'] = [
            'js/plugins/buttons/spin.min.js',
            'js/plugins/buttons/ladda.min.js',
            'js/plugins/visualization/echarts/echarts.min.js',
            'js/plugins/tables/datatables/datatables.min.js',
            'js/plugins/tables/datatables/extensions/buttons.min.js',
            'js/plugins/tables/datatables/extensions/pdfmake/pdfmake.min.js',
            'js/plugins/tables/datatables/extensions/pdfmake/vfs_fonts.min.js',
            'js/plugins/ui/moment/moment.min.js',
            'js/plugins/pickers/daterangepicker.js'
        ];

        $this->data['jsFiles_mix'] = [
            'js/pages/report/restaurant.js',
            'js/models/BioReactor.js'
        ];
        return view('report.restaurant.restaurant', $this->data);
    }
}