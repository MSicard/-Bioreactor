@extends('layouts.app')

@section('content')
<!-- Basic layout-->
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
                            <option value="organic">Orgánicos</option>
                            <option value="inorganic">Inorgánicos</option>
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