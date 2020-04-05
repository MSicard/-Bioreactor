var Notification = Notification || {};

Notification.sendEmail = function(message) {
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/notification`,
            type: `POST`,
            data: JSON.stringify(message),
            defaultSuccessHandler: false
        })
            .done(function (response, textStatus, jqXHR) {
                resolve(response);
            })
            .fail(function (response) {
                reject(response);
            });
    });
}