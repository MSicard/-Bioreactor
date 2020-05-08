var User = User || {};

User.create = function (data) {
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/user`,
            type: `POST`,
            data: JSON.stringify(data),
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

User.get = function () {
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/user/all`,
            type: `GET`,
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


User.delete = function (username) {
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/user/${username}`,
            type: `POST`,
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