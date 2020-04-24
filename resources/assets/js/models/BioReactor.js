var BioReactor = BioReactor || {};

BioReactor.sendWeight = function(data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/bioreactor`,
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

BioReactor.getByDay = function(data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        AjaxCall.request({
            url: `${BASE_URL}/bioreactor/byday`,
            data: JSON.stringify(data),
            type: `POST`,
            defaultSuccessHandler: false,
        })
            .done(function (response, textStatus, jqXHR) {
                resolve(response);
            })
            .fail(function (response) {
                reject(response);
            });
    });
}