let Errors = {};

Errors.Phone = (function () {

    var Phone = {};

    Phone.message = function (event) {

        console.log(event);

        if (event.message) {
            status_code(event)
        } else {
            cause(event);
        }

    };

    function cause(event) {
        let title = '';
        let text = '';

        switch (event.cause) {
            case 'User Denied Media Access':
                title = 'Audio / Video.';
                text = 'Tuvimos problema al obtener permiso para acceder a tus dispositivos, te recomendamos revisar que tu micrófono no se encuentre deshabilitado y que la pagina tenga los permisos para acceder al micrófono';
                break;
            case 'Canceled':
                if (event.originator !== "local") {
                    title = 'Audio / Video.';
                    text = 'Tuvimos problema al obtener permiso para acceder a tus dispositivos, te recomendamos revisar que tu micrófono no se encuentre deshabilitado y que la pagina tenga los permisos para acceder al micrófono';
                } else {
                    title = 'Audio / Video.';
                    text = 'Tuvimos problema al obtener permiso para acceder a tus dispositivos, te recomendamos revisar que tu micrófono no se encuentre deshabilitado y que la pagina tenga los permisos para acceder al micrófono';
                }
                break;
            case 'Busy':
                if (event.originator !== "local") {
                    title = 'Audio / Video.';
                    text = 'Tuvimos problema al obtener permiso para acceder a tus dispositivos, te recomendamos revisar que tu micrófono no se encuentre deshabilitado y que la pagina tenga los permisos para acceder al micrófono';
                } else {
                    title = 'Audio / Video.';
                    text = 'Tuvimos problema al obtener permiso para acceder a tus dispositivos, te recomendamos revisar que tu micrófono no se encuentre deshabilitado y que la pagina tenga los permisos para acceder al micrófono';
                }
                break;
            default:
                title = 'Oops...';
                text = 'Ocurrió un error, te recomendamos, volver a intentarlo en caso de persistir comunícate con soporte técnico.';
                break;
        }

        Swal.phone({title: title, text: text})
    }

    function status_code(event) {
        let title = 'Oops...';
        let text = 'Ocurrió un error, te recomendamos, volver a intentarlo en caso de persistir comunícate con soporte técnico.';

        switch (event.message.status_code) {
            case 503:
                if (event.cause === "SIP Failure Code" && event.message.reason_phrase === "Service Unavailable") {
                    title = 'Servicio no disponible';
                    text = 'Si estás marcando una extensión es probable que esta no se encuentre disponible o no exista';
                }
                break;
            case 404:
            case 604:
                title = 'Número no encontrado';
                text = 'Es probable que el número telefónico este mal, te recomendamos revisar el número y en caso de ser un número celular recuerda agregar 044';
                break;
        }

        Swal.phone({title: title, text: text})
    }

    return Phone
})();