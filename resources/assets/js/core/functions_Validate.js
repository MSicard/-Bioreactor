let rulesConfig = [
    {
        name: "itemId",
        regex: /^[\d,]+$/,
        failMessage: "Ingresa exclusivamente números"
    },
    {
        name: "currency",
        regex: /^(?!0\.00)[1-9]\d{0,2}(,\d{3})*(\.\d\d)?$/,
        failMessage: "Ingresa exclusivamente números"
    },
    {
        name: "emailRule",
        regex: /^(([^<>()\[\]\\.,; :\s@"]+(\.[^<>()\[\]\\.,;:\s@ "]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,
        failMessage: "Ingresa un formato válido"
    },
    {
        name: "phoneRule",
        regex: /^[\d +]{8,20}$/,
        failMessage: "Ingresa un formato válido"
    },
    {
        name: "phone164",
        regex: /^\+(?:[0-9] ?){6,14}[0-9]$/,
        failMessage: "Formato de +00000000"
    },
    {
        name: "hexColor",
        regex: /^#([A-Fa-f0-9]{6})$/,
        failMessage: "Formato Hexadecimal"
    },
    {
        name: "nonEmptySpace",
        regex: /^(?!\s*$).+/,
        failMessage: "Insert a least one non space character"
    },
    {
        name: "urlProtocol",
        regex: /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        failMessage:  "Incorrect url. Format: https|http|ftp://www.hostname.com"
    }
];

$(document).ready(function () {
    if (validator) {
        addURLValidation();
    }
    rulesConfig.forEach((config) => {
        addRule(config.name, config.regex, config.failMessage);
    });
    //addDates();
});

/*function addDates() {
    $.validator.addMethod("greaterThan", function(value, element, params) {

        let e_date = new Date($('#ending_date').val());
        let s_date = new Date($('#starting_date').val());

        console.log(e_date);
        console.log(s_date);

        return e_date.getTime() > s_date
            || e_date.getTime() === s_date.getTime();
    },'Esta fecha debe ser mayor o igual a la fecha de inicio');
}*/

function addRule(name, regex, failMessage) {
    $.validator.addMethod(name, function (value, element) {
        return this.optional(element) || regex.test(value);
    }, failMessage);
}

function addName() {
    $.validator.addMethod("nameKoble", function (value, element) {
        return this.optional(element) || /^[\w][^0-9!¡?÷?¿\\/\+=@#$%ˆ&*(){}|~<>;:[\]]+$/.test(value);
    }, "El formato no es válido");
}

function addNickname() {
    $.validator.addMethod("nickname", function (value, element) {
        return this.optional(element) || /^\w+$/i.test(value);
    }, "Letras, números, y guion bajos");
}

function addNowhitespace() {
    $.validator.addMethod("nowhitespace", function (value, element) {
        return this.optional(element) || /^\S+$/i.test(value);
    }, "Sin espacios en blanco");
}

function addLettersonly() {
    $.validator.addMethod( "lettersonly", function( value, element ) {
        return this.optional( element ) || /^[a-z]+$/i.test( value );
    }, "Letters only please" );
}

function addURLValidation() {
    $.validator.addMethod( "aURL", function( value, element ) {
        return this.optional( element ) || validator.isURL(value);
    }, "Incorrect Url" );
}

