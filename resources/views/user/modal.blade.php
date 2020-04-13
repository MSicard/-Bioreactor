<div id="modal_form" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">User</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            
            <form class="modal-body" id="user-create">
                <div class="modal-body">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6">
                                <label>Name</label>
                                <input type="text" name="name" placeholder="User Name" class="form-control">
                            </div>
                            <div class="col-sm-6">
                                <label>Email</label>
                                <input type="text" name="name" placeholder="User Email" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button"  class="btn btn-link" data-dismiss="modal">Close</button>
                    <button type="submit" id="submit-create-user" class="btn bg-primary btn-ladda btn-ladda-spinner"><span class="ladda-label">Create<span></button>
                </div>
            </form>
        </div>
    </div>
</div>