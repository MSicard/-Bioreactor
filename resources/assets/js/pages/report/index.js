const VC = function () {
    const getDataByRange = async function (start, end) {
        // let today = new Date();
        start.startOf('day');
        end.endOf('day');
        let data = await BioReactor.getByDay({
            "fromDate": start.valueOf(),
            "toDate": end.valueOf()
        });

        return data;
    }

    const initTables = async function (start, end) {
        VC.properties.byDay = document.getElementById('by_day');
        let data = await getDataByRange(start, end);
        initDataTable(data);
    }

    const initPickers = async function () {
        // Initialize with options
        $('.daterange-ranges').daterangepicker(
            {
                startDate: moment(),
                endDate: moment(),
                minDate: '01/01/2020',
                maxDate: moment(),
                dateLimit: { days: 60 },
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                opens: 'left',
                applyClass: 'btn-sm bg-slate-600',
                cancelClass: 'btn-sm btn-light'
            },
            function(start, end) {
                $('.daterange-ranges span').html(start.format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + end.format('MMMM D, YYYY'));
                initTables(start, end);
            }
        );

        // Display date format
        $('.daterange-ranges span').html(moment().format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + moment().format('MMMM D, YYYY'));

        initTables(moment(), moment());
    }

    const initDataTable = function (data) {
        if (VC.properties.datatableReport !== undefined) {
            VC.properties.datatableReport.DataTable().clear().destroy();
        }

        VC.properties.datatableReport = $('#table_report');

        $(VC.properties.datatableReport).DataTable({
            data: data,
            language: {
                lengthMenu: '<span>Mostrar </span> _MENU_',
                search: "<span>Buscar: </span> _INPUT_",
    
            },
            dom: 'Bfrltip',
            buttons: [{
                extend: 'csv',
                charset: 'UTF-8',
                filename: 'bioreactor-' + moment().format('D/MM/YY'),
                className: 'btn bg-teal-400',
            }, {
                extend: 'pdf',
                filename: 'bioreactor-' + moment().format('D/MM/YY'),
                className: 'btn bg-teal-400'
            }],
            columns: [
                { data: 'container' },
                { data: 'typeSort' },
                { data: 'weight' },
                { data: 'diffWeight'},
                { data: 'user' }
            ],
            columnDefs: [
                {
                    targets: [1],
                    render: function (data, type, row) {
                        return moment(data).format("D MMM YYYY, hh:mm:ss");
                    }
                }
            ],
            ordering: true
        });
    
        Utils.Tables.init([$(VC.properties.datatableReport).DataTable()]);
        
    }

    return {
        initTables,
        initPickers
    }
}();

VC.properties = {
    byDay: undefined,
    datatableReport: undefined
}


$(document).ready(async function () {
    VC.initPickers();
});