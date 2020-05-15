var Restaurant = Restaurant || {};

Restaurant.create = function (data) {
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/restaurant`,
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

Restaurant.get = function () {
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/restaurant/all`,
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

Restaurant.update = function (path, data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/restaurant/${path}`,
            type: `POST`,
            data: JSON.stringify(data),
            defaultSuccessHandler: false
        })
    })
}