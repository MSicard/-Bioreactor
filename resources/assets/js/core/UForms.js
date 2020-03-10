const UForms = (function () {
    let componentIntlTell = function () {
        $('.intlTell').each(function () {
            $(this).intlTelInput();
            $(this).intlTelInput("setPlaceholderNumberType", "FIXED_LINE");
            $(this).intlTelInput("separateDialCode", true);
            
            if($(this).val() == '') {
                $(this).intlTelInput("setCountry", "mx");
            }
            $(this).val(intlTelInputUtils.formatNumber($(this).intlTelInput("getNumber"), $(this).intlTelInput("getSelectedCountryData").iso2, intlTelInputUtils.numberFormat.E164));

            $(this).blur(function () {
                if ($(this).intlTelInput("getNumber").length > 18) this.value = this.value.slice(0, 18);
                $(this).val(intlTelInputUtils.formatNumber($(this).intlTelInput("getNumber"),
                    $(this).intlTelInput("getSelectedCountryData").iso2, intlTelInputUtils.numberFormat.E164))
            }).keyup(function (e) {
                if ($(this).intlTelInput("getNumber").length > 18) this.value = this.value.slice(0, 18);
                var e = window.event || e;
                var keyUnicode = e.charCode || e.keyCode;
                if (e !== undefined) {
                    switch (keyUnicode) {
                        case 16:
                            break; // Shift
                        case 17:
                            break; // Ctrl
                        case 18:
                            break; // Alt
                        case 27:
                            this.value = '';
                            break; // Esc: clear entry
                        case 35:
                            break; // End
                        case 36:
                            break; // Home
                        case 37:
                            break; // cursor left
                        case 38:
                            break; // cursor up
                        case 39:
                            break; // cursor right
                        case 40:
                            break; // cursor down
                        case 78:
                            break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
                        case 110:
                            break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
                        case 190:
                            break; // .
                        default:
                            $(this).val(intlTelInputUtils.formatNumber($(this).intlTelInput("getNumber"),
                                $(this).intlTelInput("getSelectedCountryData").iso2, intlTelInputUtils.numberFormat.E164))
                    }
                }
            });
        });

    };

    //===================================================================================================
    let fill = function (form, data) {
        if (!data) {
            return;
        }
        //-----------------------------------------------------------------------------------------------
        var prefix = "";
        var keys = Object.keys(data);
        if (form.hasAttribute('data-inputname-prefix')) {
            prefix = form.getAttribute('data-inputname-prefix');
        }
        //-----------------------------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------------------
        for (var i = 0; i < keys.length; i++) {
            let input = $(form).find('[name=' + prefix + keys[i] + ']');

            if (input.length == 0) continue;
            if (/*input[0].nodeName.toLowerCase() === 'textarea' ||*/
                input[0].nodeName.toLowerCase() === 'p') {
                $(input).html(data[keys[i]]);
            } else {
                $(input).val(data[keys[i]]);
            }

            if ($(input).hasClass('air-datepicker')) {
                let date = moment(data[keys[i]]);
                $(input).data('datepicker').selectDate(date.toDate());
            }

        }
        //-----------------------------------------------------------------------------------------------
        $(form).find('select').change();
    };
    //===================================================================================================

    //===================================================================================================
    let disable = function (form) {
        $form = $(form);
        $form.find('input').prop('disabled', true);
        $form.find('select').prop('disabled', true);
        $form.find('textarea').prop('disabled', true);
        $form.find('input[type=checkbox]').addClass('disabled');
    };
    //===================================================================================================

    //===================================================================================================
    let disableElementByName = function (form, name) {
        $(form).find(`[name='${name}']`).prop('disabled', true);
        $(form).find(`[type='checkbox'][name='${name}]'`).addClass('disabled');
    };
    //===================================================================================================

    //===================================================================================================
    let getJSONObject = function (form) {
        $form = $(form);
        var serializedForm = $form.serializeArray();
        let jsonForm = serializedForm.reduce((arr, current) => {

            let keyName = current.name;
            let value = current.value;
            let $elem = $(form[keyName]);


            if (typeof value === 'undefined' || value == null || !value) {
                return arr;
            }

            if ($elem.data('custom_key')) {
                let key = $elem.data('custom_key');
                if(typeof arr[key] === 'undefined') {
                    arr[key] = {};
                }
                arr[key][keyName] = value;
            }
            else if ($elem.data('custom_input_type') === "array") {
                if (typeof arr[keyName] !== 'undefined') {
                    arr[keyName].push(value);
                } else {
                    arr[keyName] = [value];
                }
            } else {
                arr[keyName] = value;
            }

            if ($elem.hasClass('air-datepicker')) {
                arr[keyName] = moment($elem.data('datepicker').selectedDates[0]).toISOString();
                if ($elem.hasClass('start')) arr[keyName] = moment($elem.data('datepicker').selectedDates[0]).startOf('day').toISOString();
                if ($elem.hasClass('end')) arr[keyName] = moment($elem.data('datepicker').selectedDates[0]).endOf('day').toISOString();
            }

            return arr;
        }, {});
        return jsonForm;
    };
    //===================================================================================================

    //===================================================================================================
    let resetToDefault = function (form) {
        $form = $(form);
        var inputList = $form.find('input');
        resetListToDefault(inputList);
        var selectList = $form.find('select');
        resetListToDefault(selectList);
        var textAreaList = $form.find('textarea');
        resetListToDefault(textAreaList);
    };
    //===================================================================================================

    //===================================================================================================
    let resetListToDefault = function (list) {
        for (var i = 0; i < list.length; i++) {
            resetElementToDefault(list[i]);
        }
    };
    //===================================================================================================

    //===================================================================================================
    let resetElementToDefault = function (target) {
        switch (target.type) {
            //---------------------------------------------------------------------------------------
            case "file":
                $(target).change();
                break;
            //---------------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------------
            case "select-multiple":
                for (var i = 0; i < target.options.length; i++) {
                    $(target.options[i]).prop('selected', false);
                }
                if ($(target).data('default')) {
                    $(target).data('default').split(' ').forEach(function (valToSelect) {
                        $(target).find('option[value="' + valToSelect + '"]').prop('selected', true);
                    });
                }
                $(target).change();
                break;
            //---------------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------------
            case "select-one":
                if ($(target).data('default')) {
                    target.value = $(target).data('default');
                    $(target).change();
                }
                break;
            //---------------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------------
            case "checkbox":
                if ($(target).data('default') == "true")
                    $(target).prop('checked', true);
                else
                    $(target).prop('checked', false);
                break;
            //---------------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------------
            default:
                if ($(target).data('default'))
                    target.value = $(target).data('default');
                else
                    target.value = '';
            //---------------------------------------------------------------------------------------
        }
    };
    //===================================================================================================

    //===================================================================================================
    let clear = function (form) {
        $form = $(form);

        form.reset();
        $form.find('input[type=file]').change();
        $form.find('input[type=hidden]').val('');
        $form.find('input[type=tel]').val('');
        $form.find('input[type=text]').val('');
        $form.find('select').change();
        $form.find('.form-group').removeClass('has-warning');
        $form.find('input[type=checkbox]').prop('checked', false);
        $.uniform.update('input[type=checkbox]');
    };
    //===================================================================================================

    //===================================================================================================
    let validate = function (form) {
        var invalid = false;
        var invalidFields = [];
        for (var i = form.elements.length - 1; i >= 0; i--) {
            var current = form.elements[i];
            if (current.required && $(current).val() == "") {
                invalid = true;

                if ($(current).data('splashname')) {
                    invalidFields.push("El campo " + $(current).data('splashname') + " es requerido")
                }
            }
        }

        if (invalid) {
            var string = "";

            for (var i = invalidFields.length - 1; i >= 0; i--) {
                string += "\n" + invalidFields[i]
            }

            Swal.danger(string);
        }

        return invalid
    };
    //===================================================================================================

    //===================================================================================================
    let change = function (form, data) {
        let change = false;
        if (!data) {
            return;
        }
        //-----------------------------------------------------------------------------------------------
        var prefix = "";
        var keys = Object.keys(data);
        if (form.hasAttribute('data-inputname-prefix')) {
            prefix = form.getAttribute('data-inputname-prefix');
        }
        //-----------------------------------------------------------------------------------------------
        for (var i = 0; i < keys.length; i++) {
            if ($(form).find('[name=' + prefix + keys[i] + ']')[0])
                if (keys[i] == 'start_time' || keys[i] == 'end_time') {
                    var parts = data[keys[i]].split('T');

                    if (parts[1]) {
                        var parts2 = parts[1].split(':');
                        if (parts2[0] && parts2[1]) {
                            let time = parts2[0] + ":" + parts2[1];
                            if ($(form).find('[name=' + prefix + keys[i] + ']').val() != time) {
                                change = true;
                            }
                        }
                    }

                } else {
                    if (data[keys[i]]._isAMomentObject) {
                        var value = $(form).find('[name=' + prefix + keys[i] + ']').val();
                        if (value != data[keys[i]].format('YYYY-MM-DD HH:mm:ss') ||
                            value != data[keys[i]]) {
                            change = true;
                        }
                    }
                }

        }

        return change;
    };
    //===================================================================================================
    return {
        fill: fill,
        disable: disable,
        disableElementByName: disableElementByName,
        getJSONObject: getJSONObject,
        clear: clear,
        validate: validate,
        change: change,
        resetToDefault: resetToDefault,
        initTell: componentIntlTell
    };
})();