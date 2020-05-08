<div id="modal_form" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Container</h5>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            
            <form class="modal-body" id="container-create">
                <div class="modal-body">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6">
                                <label>ID</label>
                                <input type="text" name="id" placeholder="Container ID" class="form-control">
                            </div>

                            <div class="col-sm-6">
                                <label>Name</label>
                                <input type="text" name="name" placeholder="Container Name" class="form-control">
                            </div>
                        </div>
                         
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" name="isVirtual" class="form-check-input-styled" data-fouc>
                                Es Virtual
                            </label>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button"  class="btn btn-link" data-dismiss="modal">Close</button>
                    <button type="submit" id="submit-create-container" class="btn bg-primary btn-ladda btn-ladda-spinner"><span class="ladda-label">Create<span></button>
                </div>
            </form>
        </div>
    </div>
</div>