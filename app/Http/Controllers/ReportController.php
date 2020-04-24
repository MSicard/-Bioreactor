<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\CazzRequest;
use App\Models\BioReactor;
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
}