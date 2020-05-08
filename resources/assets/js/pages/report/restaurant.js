const VC = function () {

    const initPie = async function (datapie, datanames) {
        if (VC.properties.pie !== undefined) {
            // VC.properties.datatableReport.DataTable().clear().destroy();
        }

        // Initialize chart
        let pie_basic = document.getElementById('pie_basic');
        VC.properties.pie = echarts.init(pie_basic);


        //
        // Chart config
        //

        // Options
        VC.properties.pie.setOption({

            // Colors
            color: [
                '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
            ],

            // Global text styles
            textStyle: {
                fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                fontSize: 13
            },

            // Add title
            title: {
                text: 'Weight By Container',
                subtext: 'Container Information',
                left: 'center',
                textStyle: {
                    fontSize: 17,
                    fontWeight: 500
                },
                subtextStyle: {
                    fontSize: 12
                }
            },

            // Add tooltip
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,0,0.75)',
                padding: [10, 15],
                textStyle: {
                    fontSize: 13,
                    fontFamily: 'Roboto, sans-serif'
                },
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            // Add legend
            legend: {
                bottom: 0,
                data: datanames,
                itemHeight: 8,
                itemWidth: 8
            },

            // Add series
            series: [{
                name: 'Restaurants',
                type: 'pie',
                radius: '70%',
                center: ['50%', '50%'],
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: '#fff'
                    }
                },
                data: datapie
            }]
        });
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
                initReport(start, end);
            }
        );

        // Display date format
        $('.daterange-ranges span').html(moment().format('MMMM D, YYYY') + ' &nbsp; - &nbsp; ' + moment().format('MMMM D, YYYY'));

        
    }

    const getByRestaurant = async function (start, end) {
        start.startOf('day');
        end.endOf('day');
        let data = await BioReactor.getByRestaurant({
            "fromDate": start.valueOf(),
            "toDate": end.valueOf()
        }, RESTAURANT);

        return data;
    }

    const sumData = async function (data) {
        let result = data.reduce((acc, element) => {
            return acc + element.diffWeight;
        }, 0);

        console.log(result);
        result = Math.round(result * 100)/100
        return result;
    }

    const convertData = async function(data) {
        let names = [];
        const result = data.reduce((acc, element) => {
            const found = acc.find(a => a.name == element.container);
            if (!found){
                names.push(element.container);
                acc.push({value: element.diffWeight, name: element.container}); 
            } else {
                found.value += element.diffWeight;
            }
            return acc;
        }, []);

        result.forEach(element => {
            console.log(element);
            element.value = Math.round(element.value *100) / 100;
        });

        console.log(result);
        console.log(names);
        return { 'values': result, 'legend': names }
    }

    const initReport = async function(start, end) {
        let data = await getByRestaurant(start, end);
        let totalValue = await sumData(data);
        let totalWeight = document.getElementById('total_weight');
        totalWeight.innerHTML = `${totalValue} kg`
        let { values, legend } = await convertData(data);
        initPie(values, legend);
        initDataTable(data);
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
                { data: 'typeSort' },
                { data: 'container' },
                { data: 'diffWeight'},
                { data: 'weight' },
            ],
            columnDefs: [
                {
                    targets: [0],
                    render: function (data, type, row) {
                        return moment(data).format("D MMM YYYY, hh:mm:ss");
                    }
                },
                {
                    targets: [2],
                    render: function (data, type, row) {
                        return Math.round(data * 100)/100
                    }
                },
                {
                    targets: [3],
                    render: function (data, type, row) {
                        return Math.round(data * 100)/100
                    } 
                }
            ],
            ordering: true
        });
    
        Utils.Tables.init([$(VC.properties.datatableReport).DataTable()]);
    }

    return {
        initReport,
        initPickers,
        initPie,
    }
}();

VC.properties = {
    byDay: undefined,
    datatableReport: undefined,
    pie: undefined
}

$(document).ready(async function () {
    VC.initPickers();
    VC.initReport(moment(), moment());
    console.log(RESTAURANT);
});