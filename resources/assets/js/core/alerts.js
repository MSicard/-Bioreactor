var Alerts = Alerts || {};
var Swal = Swal || {};


Alerts.notification = function showNotification(options) {
    var defaults = {
        width: "100%",
        cornerclass: "no-border-radius",
        title: "Status : " + (options['statusCode'] || ''),
        stack: {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 1},
        delay: 2000
    };

    options['addclass'] = 'stack-custom-top ' + (options['addclass'] || '');

    new PNotify($.extend(defaults, options))
};

Alerts.confirmation = function showConfirmation(options, confirmCallback, cancelCallback) {
    var defaults = {
        title: "",
        text: "",
        addclass: 'bg-base',
        hide: false,
        type: 'warning',
        confirm: {
            confirm: true,
            buttons: [
                {
                    text: 'Aceptar',
                    addClass: 'btn btn-sm btn-primary'
                },
                {
                    text: 'Cancelar',
                    addClass: 'btn btn-sm'
                }
            ]
        },
        buttons: {
            closer: false,
            sticker: false
        },
        history: {
            history: false
        }
    };

    var notice = new PNotify($.extend(defaults, options));

    notice.get().on('pnotify.confirm', confirmCallback);
    notice.get().on('pnotify.cancel', cancelCallback);
};

Swal.danger = function showNotification(message) {
    return swal({
        title: "Oops...",
        text: message,
        type: 'error',
        allowOutsideClick: false,
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'btn btn-danger swal-btn'
    }).catch(swal.noop);
};

Swal.phone = function showNotification(event) {
    return swal({
        title: event.title,
        text: event.text,
        type: 'error',
        allowOutsideClick: false,
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'btn btn-danger swal-btn'
    }).catch(swal.noop);
};

Swal.success = function showNotification(message) {
    return swal({
        title: "Success!",
        text: message,
        type: 'success',
        confirmButtonText: 'Ok',
        confirmButtonClass: 'btn btn-primary swal-btn'
    });
};

Swal.confirmation = function showConfirmation(title, text, confirmCallback, cancelCallback) {
    return swal({
        title: title,
        text: text,
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success swal-btn',
        cancelButtonClass: 'btn btn-danger swal-btn',
        allowOutsideClick: false,
        reverseButtons: true,
        onOpen: () => {
            $(swal.getActions()).addClass('swal2-justify-right')
        }
    }).then(function (isConfirm) {
        if ('dismiss' in isConfirm) {
            if (cancelCallback) {
                cancelCallback();
            }
        } else {
            if (confirmCallback) {
                confirmCallback();
            }
        }
    });
};


Swal.successSettings = function showNotification(event) {
    return swal({
        title: event.title,
        text: event.text,
        type: `success`,
        allowOutsideClick: false,
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'btn btn-success swal-btn'
    });
}

Swal.errorSettings = function showNotification(event) {
    return swal({
        title: event.title,
        text: event.text,
        type: `error`,
        allowOutsideClick: false,
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'btn btn-danger swal-btn'
    });
}

Swal.warningSettings = function showNotification(event) {
    let htmlText = document.createElement('div');
    htmlText.innerHTML = event.text;
    return swal({
        title: event.title,
        html: htmlText,
        type: `warning`,
        allowOutsideClick: false,
        showCloseButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonClass: 'btn btn-warning swal-btn'
    });
}

Swal.question = function showConfirmation(title, text, placeholder, emptyText, confirmCallback, cancelCallback) {
    swal({
        title: title,
        text: text,
        type: 'warning',
        input: 'textarea',
        inputClass: 'form-control',
        inputPlaceholder: placeholder,
        inputValidator: (value) => {
            if (!value || value === '') {
                Swal.danger(emptyText);
            }
        },
        inputAttributes: {
            autocapitalize: 'on'
        },
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success swal-btn',
        cancelButtonClass: 'btn btn-danger swal-btn',
        allowOutsideClick: false,
        reverseButtons: true,
        onOpen: () => {
            $(swal.getActions()).addClass('swal2-justify-right')
        }
    }).then(function (resolution) {
        if ('dismiss' in resolution) {
            if (cancelCallback) {
                cancelCallback();
            }
        } else {
            if (resolution.value === false) return false;
            if (resolution.value === "" || resolution.value === undefined) {
                Swal.danger(emptyText);
                return false
            }
            if (confirmCallback) {
                confirmCallback(resolution.value);
            }
        }
    });
};