<div id="modal_form" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Restaurant</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            
            <form class="modal-body" id="restaurant-create">
                <div class="modal-body">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6">
                                <label>RFID</label>
                                <input type="text" name="rfid" placeholder="Restaurant RFID" class="form-control">
                            </div>

                            <div class="col-sm-6">
                                <label>Name</label>
                                <input type="text" name="name" placeholder="Restaurant Name" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button"  class="btn btn-link" data-dismiss="modal">Close</button>
                    <button type="submit" id="submit-create-restaurant" class="btn bg-primary btn-ladda btn-ladda-spinner"><span class="ladda-label">Create<span></button>
                </div>
            </form>
        </div>
    </div>
</div>