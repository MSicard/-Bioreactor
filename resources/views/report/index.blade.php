@extends('layouts.app')

@section('content')
<div class="row">
    <div class ="col-md-12">
        <div class="card">
            <div class="card-header header-elements-inline">
                <h5 class="card-title">Reports</h5>
                <div class="header-elements">
                    <div class="list-icons">
                        <button type="button" class="btn bg-indigo-400 legitRipple daterange-ranges">
                            <i class="icon-calendar22 mr-2"></i>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
    
            <div class="card-body">
                <table id="table_report" class="table table-striped datatable table-hover col-md-12">
                    <thead>
                        <tr>
                            <th>Container</th>
                            <th>Date</th>
                            <th>Total Weight</th>
                            <th>Diff Weight</th>
                            <th>Restaurant</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
</div>
@endsection