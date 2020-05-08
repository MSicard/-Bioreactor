let validator;

async function sendEmail(data) {
    return await Notification.sendEmail(data).then(data => {
        return Promise.resolve(data);
    }).catch(error => {
        return Promise.reject(error);
    }) ;
}

async function sendWeight(data) {
    return await BioReactor.sendWeight(data).then(data => {
        return Promise.resolve(data);
    }).catch(error => {
        return Promise.reject(error);
    })
}

$(document).ready(function () {
    $('#select-container').select2({
        width: '100%'
    });
    validator = $('#send-notification').validate({
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
            message: {
                required: true
            }
        }
    });

    $('#send-notification').on('submit', async function (event) {
        event.preventDefault();
        validator.form();
        if (validator.numberOfInvalids() > 0) return;

        const data = UForms.getJSONObject(event.target);
        const ladda = Ladda.create(document.querySelector('#submit-notification'));
        ladda.start();

        sendEmail(data).then(() => {
            ladda.stop();
            Swal.success(`Email notification sended sucessfully!`);
        }).catch(() => {
            ladda.stop();
            Swal.danger(`Error sending notification`);
        })
    });

    $('#form-weight').on('submit', async function (event) {
        event.preventDefault();
        // validator.form();
        // if (validator.numberOfInvalids() > 0) return;

        const data = UForms.getJSONObject(event.target);
        const ladda = Ladda.create(document.querySelector('#submit-weight'));
        ladda.start();

        sendWeight(data).then(() => {
            ladda.stop();
            Swal.success(`Data sended`)
        }).catch(() => {
            ladda.stop();
            Swal.danger(`Error sending data`);
        });
        
    });
})