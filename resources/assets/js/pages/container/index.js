
const VC = function () {
    const createContainer = async function(data) {
        return await Container.create(data).then(data => {
            return Promise.resolve(data);
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    const initForm = function () {
        VC.properties.containerValidator = $('#container-create').validate({
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
    
        $('#container-create').on('submit', async function (event) {
            event.preventDefault();
    
            VC.properties.containerValidator.form();
            if (VC.properties.containerValidator.numberOfInvalids() > 0) return;
    
            const data = UForms.getJSONObject(event.target);
            const ladda = Ladda.create(document.querySelector('#submit-create-container'));
            ladda.start();
    
            createContainer(data).then((data) => {
                ladda.stop(); 
                console.log(data);
                $(VC.properties.datatableContainer).DataTable().row.add(data); // Add new data
                $(VC.properties.datatableContainer).DataTable().draw();
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
        VC.properties.datatableContainer = $('#container_table');

        $(VC.properties.datatableContainer).DataTable({
            data: data,
            language: {
                lengthMenu: '<span>Mostrar </span> _MENU_',
                search: "<span>Buscar: </span> _INPUT_",
    
            },
            dom: 'frltip',
            columns: [
                { data: 'id' },
                { data: 'name' },
                { data: 'createdAt' },
                { data: null}
            ],
            columnDefs: [
                {
                    targets: [3],
                    render: function (data, type, row) {
                        return `<button type="button" class="btn btn-danger btn_delete"><i class="icon-trash"></i></button>`
                    }
                }
            ],
            ordering: true
        });
    
        Utils.Tables.init([$(VC.properties.datatableContainer).DataTable()]);
    }

    return {
        initDataTable,
        initForm
    }
}();

VC.properties = {
    containerValidator: undefined,
    datatableContainer: undefined
}



$(document).ready(async function () {
    let data = await Container.get();
    VC.initDataTable(data);
    VC.initForm();
});