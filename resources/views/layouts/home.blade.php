@extends('layouts.app')

@section('content')
<!-- Basic layout-->
<div class="row">
    <div class="col-lg-8">  
        <div class="row">
            <div class="col-lg-4">
                <div class="card bg-teal-400">
                    <div class="card-body">
                        <div class="d-flex">
                            <h3 id="value_today" class="font-weight-semibold mb-0"></h3>
                            <div class="list-icons ml-auto">
                                <a class="list-icons-item" id="reload-day" data-action="reload"></a>
                            </div>
                        </div>
                        
                        <div>
                            <div id="date_today"></div>
                            <div class="font-size-sm opacity-75">basura de hoy</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card bg-pink-400">
                    <div class="card-body">
                        <div class="d-flex">
                            <h3 id="value_yesterday" class="font-weight-semibold mb-0"></h3>
                        </div>
                        
                        <div>
                            <div id="date_yesterday"></div>
                            <div class="font-size-sm opacity-75">basura de ayer</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card bg-blue-400">
                    <div class="card-body">
                        <div class="d-flex">
                            <h3 id="value_week" class="font-weight-semibold mb-0"></h3>
                        </div>
                        
                        <div>
                            <div id="date_week"></div>
                            <div class="font-size-sm opacity-75">basura de la semana</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header header-elements-inline">
                        <h5 class="card-title">By Day</h5>
                        <div class="header-elements">
                            <div class="list-icons">
                                <a class="list-icons-item"  id="reload-graph" data-action="reload"></a>
                            </div>
                        </div>
                    </div>
                
                    <div class="card-body">
                        <div class="chart-container">
                            <div class="chart has-fixed-height" id="by_day"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header header-elements-inline">
                        <h5 class="card-title">Notification</h5>
                        <div class="header-elements">
                            <div class="list-icons">
                                <a class="list-icons-item" data-action="collapse"></a>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <form id="send-notification" action="#">
                            <div class="form-group">
                                <label>Your message:</label>
                                <textarea rows="5" cols="5" required name="message" class="form-control"
                                    placeholder="Enter your message here"></textarea>
                            </div>

                            <div class="text-right">
                                <button type="submit" id="submit-notification" data-style="expand-left"
                                    class="btn btn-primary btn-ladda btn-ladda-spinner">
                                    <span class="ladda-label">Send Notification<i class="icon-paperplane ml-2"></span></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header header-elements-inline">
                        <h5 class="card-title">New Register</h5>
                        <div class="header-elements">
                            <div class="list-icons">
                                <a class="list-icons-item" data-action="collapse"></a>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        
                        <form id="form-weight" action="#">
                            <div class="form-group">
                                <label>Container:</label>
                                <select class="form-control" id="select-container" name="container">
                                    @if(isset($container) && is_array($container)) 
                                        @foreach ($container as $item) 
                                            @if (isset($item['isVirtual']) && $item['isVirtual'])
                                                <option value="{{ $item['TypeSort'] }}"`>{{ $item['name'] }}</option>
                                            @endif
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Your weight:</label>
                                <input required name="weight" type="number" class="form-control"
                                    placeholder="Enter the Weight"/>
                            </div>

                            <div class="text-right">
                                <button type="submit" id="submit-weight" data-style="expand-left"
                                    class="btn btn-primary btn-ladda btn-ladda-spinner">
                                    <span class="ladda-label">Save Data<i class="icon-paperplane ml-2"></span></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection