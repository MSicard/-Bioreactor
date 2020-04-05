var AjaxCall = AjaxCall || {};

AjaxCall.successHandler = false;
AjaxCall.failHandler = false;

AjaxCall.request = function (options) {
    console.log($('meta[name="csrf-token"]').attr('content'));
    var defaults = {
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'GET',
        dataType: 'JSON',
        defaultFailHandler: true,
        defaultSuccessHandler: true
    };

    var realOptions = $.extend(defaults, options);
    console.log(realOptions);
    return $.ajax(realOptions)
        .done(function (response, textStatus, jqXHR) {
            if (AjaxCall.successHandler && {}.toString.call(AjaxCall.successHandler) === '[object Function]' && realOptions.defaultSuccessHandler) {
                AjaxCall.successHandler(response, textStatus, jqXHR)
            }
        })
        .fail(function (response) {
            if (response.responseJSON.code === 401)
                logout();
            if (AjaxCall.failHandler && {}.toString.call(AjaxCall.failHandler) === '[object Function]' && realOptions.defaultFailHandler) {
                AjaxCall.failHandler(response)
            }
        })
};

