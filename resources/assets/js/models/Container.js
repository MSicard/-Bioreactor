var Container = Container || {};

Container.create = function (data) {
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/container`,
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

Container.get = function () {
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/container/all`,
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

Container.update = function (path, data) {
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/container/${path}`,
            type: `POST`,
            data: JSON.stringify(data),
            defaultSuccessHandler: false
        })
    })
}