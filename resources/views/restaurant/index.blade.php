@extends('layouts.app')

@section('content')
<div class="row">
    <div class ="col-md-12">
        <div class="card">
            <div class="card-header header-elements-inline">
                <h5 class="card-title">Restaurants</h5>
                <div class="header-elements">
                    <div class="list-icons">
                        <a class="list-icons-item" data-action="collapse"></a>
                    </div>
                </div>
            </div>
    
            <div class="card-body">
                <div>
                    <button>Create Restaurant</button>
                </div>
                <table id="restaurant_table" class="display col-md-12">
                    <thead>
                        <tr>
                            <th>RFID</th>
                            <th>Name</th>
                            <th>Created At </th>
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