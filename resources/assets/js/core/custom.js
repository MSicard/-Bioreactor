var InitCustomScroll = function () {


    //
    // Setup module components
    //

    // Perfect scrollbar
    var _componentPerfectScrollbar = function () {
        if (typeof PerfectScrollbar == 'undefined') {
            console.warn('Warning - perfect_scrollbar.min.js is not loaded.');
            return;
        }

        // Initialize

        var ps = new PerfectScrollbar('.sidebar-main .sidebar-content', {
            wheelSpeed: 2,
            wheelPropagation: true
        });

        /*var ps2 = new PerfectScrollbar('.sidebar-right .sidebar-content', {
            wheelSpeed: 2,
            wheelPropagation: true
        });*/

    };

    var _componentNiceScrollbar = function () {

        $("#content_div").niceScroll();
    };

    return {
        init: function () {
            _componentPerfectScrollbar();
        }
    }
}();
document.addEventListener('DOMContentLoaded', function () {
    /*$.blockUI({
        message: '<i class="icon-spinner3 icon-3x spinner"></i>',
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            color: '#fff',
            padding: 0,
            backgroundColor: 'transparent'
        },
        onBlock: function () {
            $showWebphone = false;
        },
        onUnblock: function () {
            $showWebphone = true;
        },
    });*/


    $(window)
        .on('resize', function () {
            $(".keypad-wrapper").css("max-width", ($('.sidebar-right').width() - 1) + 'px');
            if ($.fn.dataTable)
                $.fn.dataTable.tables({visible: true, api: true}).columns.adjust().draw(false);
        })
        .on('show.bs.modal', function () {
            setTimeout(function () {
                if ($.fn.dataTable)
                    $.fn.dataTable.tables({visible: true, api: true}).columns.adjust().draw(false);
            }, 500);
        });
    //.trigger('resize');

    $('body').attrchange({
        trackValues: true,
        callback: function (event) {

            //$.fn.dataTable.tables({visible: true, api: true}).columns.adjust().draw(false);

            if (event.attributeName == 'class') {

                if (event.newValue.includes('sidebar-xs')) {
                    $('.sidebar_header').addClass('nav-item-submenu');
                    $('.sidebar_body').addClass('nav-group-sub');
                    $('.span_take_break').html('<i class="icon-alarm-check m-auto pb-3 pt-3"></i>')
                } else {
                    $('.sidebar_header').removeClass('nav-item-submenu');
                    $('.sidebar_body').removeClass('nav-group-sub');
                    $('.span_take_break').html('Tomar descanso')
                }

            }


        }
    });

    $('.sidebar-right').attrchange({
        trackValues: true,
        callback: function (event) {
            //$.fn.dataTable.tables({visible: true, api: true}).columns.adjust().draw(false);
            if (event.attributeName == 'class') {
                if (event.newValue.includes('sidebar-fullscreen')) {
                    $(".keypad-wrapper").css("max-width", '');
                    $(".number-button").css("width", '33.3%');

                }
            }
        }
    });

    $('.line-btn').on('click', function () {
        switch ($(this)[0].dataset.id) {
            case '1':
                $('#ul_line_0').trigger('click');
                break;
            case '2':
                $('#ul_line_1').trigger('click');
                break;
            case '3':
                $('#ul_line_2').trigger('click');
                break;
            case '4':
                $('#ul_line_3').trigger('click');
                break;
            case '5':
                $('#ul_line_4').trigger('click');
                break;
        }
    });

    InitCustomScroll.init();


});