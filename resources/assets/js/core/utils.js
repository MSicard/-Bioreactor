let Utils = {};

Utils.Forms = (function () {

    var Forms = {};

    Forms.fill = function (form, data) {
        if (!data) {
            return
        }

        var prefix = "";
        if (form.hasAttribute('data-inputname-prefix')) {
            prefix = form.getAttribute('data-inputname-prefix')
        }

        var keys = Object.keys(data);

        for (var i = 0; i < keys.length; i++) {
            let input = $(form).find('[name=' + prefix + keys[i] + ']');
            if (input.length > 0) {
                if (input[0].nodeName.toLowerCase() === 'textarea' || input[0].nodeName.toLowerCase() === 'p' || input[0].nodeName.toLowerCase() === 'label') {
                    $(input).html(data[keys[i]])
                } else if(input[0].nodeName.toLowerCase() === 'select'){
                    $(input).val(data[keys[i]]).change();
                } else {
                    if($(input).hasClass('anytime-date')) {
                        $(input).data('daterangepicker').setStartDate(moment(data[keys[i]]).format("DD/MM/YYYY - HH:mm"));
                    }
                    else if($(input).hasClass('pickadate')) {
                        $(input).data('daterangepicker').setStartDate(moment(data[keys[i]]).format("DD/MM/YYYY"));
                    } else if ($(input).hasClass('datetimepicker')) {
                        $(input).datetimepicker('date', moment(data[keys[i]]));
                    } else if($(input).attr('type') === 'checkbox') {
                        if(data[keys[i]] === true && !$(input).is(':checked')) {
                            $(input).trigger("click");
                        } else if(data[keys[i]] === false && $(input).is(':checked')) {
                            $(input).trigger("click");
                        }
                    } else if($(input).hasClass('intlTell')) {
                        $(input).intlTelInput("setNumber", data[keys[i]]);
                        $(input).val(intlTelInputUtils.formatNumber($(input).intlTelInput("getNumber"),
                            $(input).intlTelInput("getSelectedCountryData").iso2, intlTelInputUtils.numberFormat.INTERNATIONAL))
                    } else $(input).val(data[keys[i]]);

                }
            }
        }

        //$(form).find('select').change()
    };

    Forms.disabled = function (form) {
        $form = $(form);
        $form.find('input').prop('disabled', true);
        $form.find('select').prop('disabled', true);
        $form.find('textarea').prop('disabled', true);
        $form.find('input[type=checkbox]').addClass('disabled');
    };

    Forms.clear = function (form) {
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

    Forms.validate = function (form) {
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

    Forms.change = function (form, data) {
        let change = false;
        if (!data) {
            return
        }

        var prefix = "";
        if (form.hasAttribute('data-inputname-prefix')) {
            prefix = form.getAttribute('data-inputname-prefix')
        }

        var keys = Object.keys(data);

        for (var i = 0; i < keys.length; i++) {
            if ($(form).find('[name=' + prefix + keys[i] + ']')[0])
                if (keys[i] == 'start_time' || keys[i] == 'end_time') {
                    var parts = data[keys[i]].split('T');

                    if (parts[1]) {
                        var parts2 = parts[1].split(':');
                        if (parts2[0] && parts2[1]) {
                            let time = parts2[0] + ":" + parts2[1]
                            if ($(form).find('[name=' + prefix + keys[i] + ']').val() != time) {
                                change = true;
                            }
                        }
                    }

                } else {
                    if (data[keys[i]]._isAMomentObject) {
                        if ($(form).find('[name=' + prefix + keys[i] + ']').val() != data[keys[i]].format('YYYY-MM-DD HH:mm:ss')) {
                            change = true;
                        }
                    } else {
                        if ($(form).find('[name=' + prefix + keys[i] + ']').val() != data[keys[i]]) {
                            change = true;
                        }
                    }
                }

        }

        return change;
    };

    return Forms
})();

Utils.Tables = (function () {

    var Tables = {};

    Tables.init = function (tables) {

       /* for (let i = 0; i < tables.length; i++) {
            tables[i].on('preXhr.dt', function (e, settings, data) {
                $(this).block({
                    message: '<i class="icon-spinner3 icon-3x spinner"></i> Cargando..',
                    overlayCSS: {
                        backgroundColor: '#fff',
                        opacity: 0.8,
                        cursor: 'wait'
                    },
                    css: {
                        border: 0,
                        padding: 0,
                        backgroundColor: 'transparent'
                    }
                });
            })
                .on('xhr.dt', function (e, settings, json, xhr) {
                    $(this).unblock()
                });
        }*/

        $('.dataTables_processing').html(`<i class="fas fa-spinner fa-spin mr-2"></i> Loading...`);

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity,
            width: '80px',
            containerCss: 'text-center',
            containerCssClass: 'text-center',
            dropdownCss: 'text-center',
            dropdownCssClass: 'text-center',
        });

        $('.datatable-scroll').css('overflow-x', 'auto');
    };

    Tables.append = function(table, data){
        //From API documentation: https://datatables.net/reference/api/draw()
        /*
            full-hold or false - the ordering and search will be 
            recalculated and the rows redrawn in their new positions. 
            The paging will not be reset - i.e. the current page will 
            still be shown.
        */        
        if(!data || data.length === 0) return;

        //Maybe this processing can be delegated to table.
        const toAdd = data.filter((newElement) => {
            return table.row(`#tick_${newElement.clientId}`).length == 0;
        });

        const toUpdate = data.filter((newElement) =>  {
            return table.row(`#tick_${newElement.clientId}`).length > 0;
        });
        table.rows.add(toAdd).draw(false);
        toUpdate.forEach((updatedElement)=>{
            table.row(`#tick_${updatedElement.clientId}`).data(updatedElement).draw(false);
        });

    }

    Tables.fill = function (table, data) {
        table.clear();
        table.rows.add(data);
        //From API documentation: https://datatables.net/reference/api/draw()
        /*
            full-hold or false - the ordering and search will be 
            recalculated and the rows redrawn in their new positions. 
            The paging will not be reset - i.e. the current page will 
            still be shown.
        */
        table.draw(false);
    };

    Tables.clear = function (table) {
        table.clear();
        table.draw();
    };

    Tables.drawOnClick = function (object, table) {
        object.on('click', function () {
            setTimeout(function () {
                table.draw();
            }, 200);
        });
    };

    return Tables
})();

Utils.Loaders = (function () {

    var Loaders = {};

    Loaders.show = function (body) {

        $(".page-header").addClass('d-none');
        $(body).addClass('d-none');
        $(".loader_page").removeClass('d-none');

    };

    Loaders.hidden = function (body) {
        $(".page-header").removeClass('d-none');
        $(body).removeClass('d-none');
        $(".loader_page").addClass('d-none');
    };

    Loaders.error = function (error) {
        Swal.danger(error);
        $(".page-header").removeClass('d-none');
        $(".loader_page").addClass('d-none');
    };


    return Loaders
})();

Utils.CurrencyFormat = (function () {
    var CurrencyFormat = {};

    CurrencyFormat.init = function (tag) {

        $(tag).blur(function () {
            $(this).formatCurrency({colorize: true, negativeFormat: '-%s%n', roundToDecimalPlace: 2});
        }).keyup(function (e) {
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
                        $(this).formatCurrency({
                            colorize: true,
                            negativeFormat: '-%s%n',
                            roundToDecimalPlace: -1,
                            eventOnDecimalsEntered: true
                        });
                }
            }
        });

    };

    CurrencyFormat.withSign = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    });

    CurrencyFormat.withoutSign = new Intl.NumberFormat('es-MX', {
        style: 'decimal',
        currency: 'MXN',
        minimumFractionDigits: 2
    });

    return CurrencyFormat

})();

Utils.Waiting = (function () {
    var Waiting = {};

    Waiting.show = function (elem) {
        $(elem).addClass('waiting');
        $(elem).attr('disabled', true);
    };

    Waiting.hide = function (elem) {
        $(elem).removeClass('waiting');
        $(elem).attr('disabled', false);
    };

    return Waiting;
})();

const encodeGetParams = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");