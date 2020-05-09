@extends('layouts.app')

@section('content')
<div class="row" >
    <div class="col-lg-12">
        <button type="button" class="btn bg-indigo-400 float-right my-3 legitRipple daterange-ranges">
            <i class="icon-calendar22 mr-2"></i>
            <span></span>
        </button>
    </div>
</div>
<div class="row">
    <div class="col-lg-8">  
        <div class="card">
            <div class="card-header header-elements-inline">
                <h5 class="card-title" id="name">@if(isset($restaurant)) {{$restaurant}} @endif</h5>
            </div>
            <div class="card-body">
                <table id="table_report" class="table table-striped datatable table-hover col-md-12">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Container</th>
                            <th>Weight</th>
                            <th>Total Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="col-lg-4"> 
        <div class="row">
            <div class="col-lg-12">
                <div class="card card-body bg-teal-400 has-bg-image">
                    <div class="media">
                        <div class="mr-3 align-self-center">
                            <i class="icon-trash icon-3x opacity-75"></i>
                        </div>

                        <div class="media-body text-right">
                            <h3 class="mb-0" id="total_weight"></h3>
                            <span class="text-uppercase font-size-xs">total weight</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div class="row">
            <div class="col-lg-12">  
                <div class="card">
                    <div class="card-header header-elements-inline">
                        <h5 class="card-title">Basura por Contenedor</h5>
                        <div class="header-elements">
                            <div class="list-icons">
                                <a class="list-icons-item" data-action="collapse"></a>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="chart-container">
                            <div class="chart has-fixed-height" id="pie_basic"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@if(isset($restaurant))
<script type="text/javascript">
    var RESTAURANT = `{{$restaurant}}`
</script>
@endif
@endsection