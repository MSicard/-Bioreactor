let restaurantValidator;
let datatableRestaurant;

async function createRestaurant(data) {
    return await Restaurant.create(data).then(data => {
        return Promise.resolve(data);
    }).catch(error => {
        return Promise.reject(error);
    })
}

async function activeRestaurant(type, value) {
    return await Restaurant.update(type, value).then(data => {
        return Promise.resolve(data);
    }).catch(error => {
        return Promise.reject(error);
    });
}


function initForms() {
    restaurantValidator = $('#restaurant-create').validate({
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
            rfid: {
                required: true
            }
        }
    });

    $('#restaurant-create').on('submit', async function (event) {
        event.preventDefault();

        restaurantValidator.form();
        if (restaurantValidator.numberOfInvalids() > 0) return;

        const data = UForms.getJSONObject(event.target);
        const ladda = Ladda.create(document.querySelector('#submit-create-restaurant'));
        ladda.start();

        createRestaurant(data).then((data) => {
            ladda.stop(); 
            $(datatableRestaurant).DataTable().row.add(data); // Add new data
            $(datatableRestaurant).DataTable().draw();
            $('#modal_form').modal('hide');
            Swal.success(`Data sended`)
        }).catch(() => {
            ladda.stop();
            $('#modal_form').modal('hide')
            Swal.danger(`Error sending data`);
        });

    });
}

$(document).ready(async function () {
    let data = await Restaurant.get();
    console.log(data);
    
    datatableRestaurant = $('#restaurant_table');

    $(datatableRestaurant).DataTable({
        data: data,
        language: {
            lengthMenu: '<span>Mostrar </span> _MENU_',
            search: "<span>Buscar: </span> _INPUT_",

        },
        dom: 'frltip',
        columns: [
            { data: 'rfid' },
            { data: 'name' },
            { data: 'createdAt' },
            { data: 'isActive'}
        ],
        columnDefs: [
            {
                targets: [3],
                render: function (data, type, row) {
                    return `<input type="checkbox" data-type="${row.rfid}" name="isActive" ${data == true ? `checked="checked"` : ""}">`
                }
            }
        ],
        ordering: true
    });

    Utils.Tables.init([$(datatableRestaurant).DataTable()]);
    initForms();
    $("[name='isActive'").bootstrapSwitch({
        onSwitchChange: function(event) {
            activeRestaurant(event.currentTarget.dataset.type, {
                "isActive": $(event.currentTarget).bootstrapSwitch('state')
            }).then((data) => {
                Swal.success(`Restaurant updated success`)
            }).catch(() => {
                Swal.danger(`Error updating data`);
            });
        }
    });
});