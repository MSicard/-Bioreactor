const VC = function () {
    const createUser = async function(data) {
        return await User.create(data).then(data => {
            return Promise.resolve(data);
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    const initForm = function () {
        VC.properties.userValidator = $('#user-create').validate({
            errorClass: 'validation-invalid-label',
            successClass: 'validation-valid-label',
            highlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
            rules: {
                name: {
                    required: true
                },
                id: {
                    required: true
                }
            }
        });
    
        $('#user-create').on('submit', async function (event) {
            event.preventDefault();
    
            VC.properties.userValidator.form();
            if (VC.properties.userValidator.numberOfInvalids() > 0) return;
    
            const data = UForms.getJSONObject(event.target);
            const ladda = Ladda.create(document.querySelector('#submit-create-user'));
            ladda.start();
    
            createUser(data).then((data) => {
                ladda.stop(); 
                console.log(data);
                $(VC.properties.datatableUser).DataTable().row.add(data); // Add new data
                $(VC.properties.datatableUser).DataTable().draw();
                $('#modal_form').modal('hide');
                Swal.success(`Data sended`)
            }).catch(() => {
                ladda.stop();
                $('#modal_form').modal('hide')
                Swal.danger(`Error sending data`);
            });
    
        });
    }

    const initDataTable = function (data) {
        VC.properties.datatableUser = $('#user_table');
        $(VC.properties.datatableUser).DataTable({
            data: data,
            language: {
                lengthMenu: '<span>Mostrar </span> _MENU_',
                search: "<span>Buscar: </span> _INPUT_",
    
            },
            dom: 'frltip',
            columns: [
                { data: 'name' },
                { data: 'createdAt' },
                { data: null}
            ],
            columnDefs: [
                {
                    targets: [2],
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-danger btn_delete"><i class="icon-trash"></i></button>`
                    }
                }
            ],
            ordering: true
        });
    
        Utils.Tables.init([$(VC.properties.datatableUser).DataTable()]);
    }

    return {
        initDataTable,
        initForm
    }
}();

VC.properties = {
    userValidator: undefined,
    datatableUser: undefined
}



$(document).ready(async function () {
    let data = await User.get();
    VC.initDataTable([]);
    VC.initForm();
});