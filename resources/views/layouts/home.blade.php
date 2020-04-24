@extends('layouts.app')

@section('content')
<!-- Basic layout-->
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header header-elements-inline">
                <h5 class="card-title">By Day</h5>
                <div class="header-elements">
                    <div class="list-icons">
                        <a class="list-icons-item" data-action="reload"></a>
                        <a class="list-icons-item" data-action="remove"></a>
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

<div class="row">
    <div class="col-md-6">
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
    <div class="col-md-6">
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
                                    <option value="{{ $item['TypeSort'] }}"`>{{ $item['name'] }}</option>
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
@endsection