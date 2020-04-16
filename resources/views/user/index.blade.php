@extends('layouts.app')

@section('modals')
    @include('user.modal')
@endsection

@section('content')
<div class="row">
    <div class ="col-md-12">
        <div class="card">
            <div class="card-header header-elements-inline">
                <h5 class="card-title">User</h5>
                <div class="header-elements">
                    <div class="list-icons">
                        <button type="button" data-style="expand-left" data-toggle="modal" data-target="#modal_form"
                            class="btn btn-primary"> Create User<i class="icon-paperplane ml-2"></span></i>
                        </button>
                    </div>
                </div>
            </div>
    
            <div class="card-body">
                <table id="user_table" class="table table-striped datatable table-hover col-md-12">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
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