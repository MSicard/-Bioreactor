const I18nextDirect = function () {

    let _componentI18nextDirect = function () {
        if (typeof i18next == 'undefined') {
            console.error('Warning - i18next.min.js is not loaded.');
            return;
        }

        // Define main elements
        let
            englishLangClass = '.english',
            spanishLangClass = '.español';
        I18nextDirect.properties.$localizationElement = $('body');

        // Add options
        i18next.use(i18nextXHRBackend).use(i18nextBrowserLanguageDetector).init({
                lng: 'en',
                backend: {
                    loadPath: 'locales/{{lng}}.json'
                },
                debug: false,
                fallbackLng: false
            },
            function (err, t) {

                // Initialize library
                jqueryI18next.init(i18next, $);

                // Initialize translation
                I18nextDirect.properties.$localizationElement.localize();

                // To avoid FOUC when translation gets initialized,
                // use data-fouc attribute in all elements by default. When translation
                // is initialized, remove it from all elements
                I18nextDirect.properties.$localizationElement.find('[data-i18n]').removeAttr('data-fouc');
            });

        // English
        $(englishLangClass).on('click', function () {

            i18next.changeLanguage('en');
            i18next.off("languageChanged");
            i18next.on('languageChanged', function () {
                I18nextDirect.properties.$localizationElement.localize();
                $.extend($.validator.messages, {
                    required: "This field is required.",
                    remote: "Please fix this field.",
                    email: "Please enter a valid email address.",
                    url: "Please enter a valid URL.",
                    date: "Please enter a valid date.",
                    dateISO: "Please enter a valid date (ISO).",
                    number: "Please enter a valid number.",
                    digits: "Please enter only digits.",
                    equalTo: "Please enter the same value again.",
                    maxlength: $.validator.format("Please enter no more than {0} characters."),
                    minlength: $.validator.format("Please enter at least {0} characters."),
                    rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
                    range: $.validator.format("Please enter a value between {0} and {1}."),
                    max: $.validator.format("Please enter a value less than or equal to {0}."),
                    min: $.validator.format("Please enter a value greater than or equal to {0}."),
                    step: $.validator.format("Please enter a multiple of {0}."),
                    phone164: "The format must be: +0000000000000"
                });
                Form.properties.form.valid();
                Form.translateSelect2();
            });
        });

        // Español
        $(spanishLangClass).on('click', function () {

            i18next.changeLanguage('es');
            i18next.off("languageChanged");
            i18next.on('languageChanged', function () {
                I18nextDirect.properties.$localizationElement.localize();
                $.extend($.validator.messages, {
                    required: "Este campo es obligatorio.",
                    remote: "Por favor, rellena este campo.",
                    email: "Por favor, escribe una dirección de correo válida.",
                    url: "Por favor, escribe una URL válida.",
                    date: "Por favor, escribe una fecha válida.",
                    dateISO: "Por favor, escribe una fecha (ISO) válida.",
                    number: "Por favor, escribe un número válido.",
                    digits: "Por favor, escribe sólo dígitos.",
                    creditcard: "Por favor, escribe un número de tarjeta válido.",
                    equalTo: "Por favor, escribe el mismo valor de nuevo.",
                    extension: "Por favor, escribe un valor con una extensión aceptada.",
                    maxlength: $.validator.format("Por favor, no escribas más de {0} caracteres."),
                    minlength: $.validator.format("Por favor, no escribas menos de {0} caracteres."),
                    rangelength: $.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
                    range: $.validator.format("Por favor, escribe un valor entre {0} y {1}."),
                    max: $.validator.format("Por favor, escribe un valor menor o igual a {0}."),
                    min: $.validator.format("Por favor, escribe un valor mayor o igual a {0}."),
                    phone164: "El formato debe ser: +0000000000000"
                });
                Form.properties.form.valid();
                Form.translateSelect2();
            });
        });

    };

    return {
        init: function () {
            _componentI18nextDirect();
        }
    }
}();

I18nextDirect.properties = {
    $localizationElement: undefined,
}