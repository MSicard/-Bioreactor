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
<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header bg-white header-elements-inline">
                <h6 class="card-title">Container</h6>
                <div class="header-elements">
                    <div class="list-icons">
                        <a class="list-icons-item" data-action="collapse"></a>
                    </div>
                </div>
            </div>
                <ul class="media-list media-list-linked">
                    @if(isset($containers) && is_array($containers)) 
                        @foreach ($containers as $item) 
                            <li>
                                <a href="/report/container/{{ $item['id'] }}" class="media">
                                    <div class="mr-3"><i class="
                                        @if (isset($item['isVirtual']) && $item['isVirtual']) icon-cloud  
                                        @else icon-trash 
                                        @endif mr-3 icon-2x" width="40" height="40"></i></div>
                                    <div class="media-body">
                                        <div class="media-title font-weight-semibold">{{ $item['name'] }}</div>
                                        <span class="text-muted">
                                            @if (isset($item['isVirtual']) && $item['isVirtual']) Virtual 
                                            @else Físico
                                            @endif </span>
                                    </div>
                                    <div class="align-self-center ml-3">
                                        @if (isset($item['isActive']) && $item['isActive'])
                                            <span class="badge badge-primary">Disponible</span>
                                        @else 
                                            <span class="badge badge-danger">Deshabilitado</span>
                                        @endif
                                    </div>
                                </a>
                            </li>
                        @endforeach
                    @endif
                </ul>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card">
            <div class="card-header bg-white header-elements-inline">
                <h6 class="card-title">Restaurant</h6>
                <div class="header-elements">
                    <div class="list-icons">
                        <a class="list-icons-item" data-action="collapse"></a>
                    </div>
                </div>
            </div>
                <ul class="media-list media-list-linked">
                    @if(isset($restaurants) && is_array($restaurants)) 
                        @foreach ($restaurants as $item) 
                            <li>
                                <a href="/report/restaurant/{{ $item['userid'] }}" class="media">
                                    <div class="mr-3"><i class="icon-store2 mr-3 icon-2x" width="40" height="40"></i></div>
                                    <div class="media-body">
                                        <div class="media-title font-weight-semibold">{{ $item['name'] }}</div>
                                        <span class="text-muted">@if (isset($item['rfid'])) {{ $item['rfid' ]}} @endif</span>
                                    </div>
                                    <div class="align-self-center ml-3">
                                        @if (isset($item['isActive']) && $item['isActive'])
                                            <span class="badge badge-primary">Disponible</span>
                                        @else 
                                            <span class="badge badge-danger">Deshabilitado</span>
                                        @endif
                                    </div>
                                </a>
                            </li>
                        @endforeach
                    @endif

                    @if(isset($users) && is_array($users)) 
                        @foreach ($users as $item) 
                            <li>
                                <a href="/report/restaurant/{{ $item['Username'] }}" class="media">
                                    <div class="mr-3"><i class="icon-user mr-3 icon-2x" width="40" height="40"></i></div>
                                    <div class="media-body">
                                        <div class="media-title font-weight-semibold">{{ $item['Username'] }}</div>
                                        <span class="text-muted">@if (isset($item['email'])) {{ $item['email' ]}} @endif</span>
                                    </div>
                                    <div class="align-self-center ml-3">
                                        <span class="badge badge-primary">Disponible</span>
                                    </div>
                                </a>
                            </li>
                        @endforeach
                    @endif
                </ul>
        </div>
    </div>
</div>
@endsection