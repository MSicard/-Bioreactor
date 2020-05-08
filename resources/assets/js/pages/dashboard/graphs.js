const VC = function () {
    const getDataByRange = async function (start, end) {
        start.startOf('day');
        end.endOf('day');
        let data = await BioReactor.getByDay({
            "fromDate": start.valueOf(),
            "toDate": end.valueOf()
        });

        return data;
    }

    const convertData = function (data) {
        let myContainers = {};
        data.forEach(element => {
            if (!myContainers.hasOwnProperty(element.container)) {
                myContainers[element.container] = [];
            }
            myContainers[element.container].push([element.typeSort, element.weight, element.user]);
        });
        return convertToSerie(myContainers);
    }

    const convertToSerie = function (data) {
        let serie = [];
        let legend = [];
        for (let element in data) {
            legend.push(element);
            serie.push({
                name: element,
                type: 'line',
                smooth: true,
                symbolSize: 6,
                itemStyle: {
                    normal: {
                        borderWidth: 2
                    }
                },
                data: data[element]
            })
        }
        return { 'series': serie, 'legend': legend };
    }

    const initGraph = async function () {
        VC.properties.byDay = document.getElementById('by_day');
        let data = await getDataByRange(moment(), moment());
        let { series, legend } = convertData(data);
        initDayGraph(series, legend, new Date());
    }

    const initValue = async function () {
        setValue($('#value_today'), $('#date_today'), moment(), moment());
        setValue($('#value_yesterday'), $('#date_yesterday'), moment().subtract(1, 'days'), moment().subtract(1, 'days'));
        setValue($('#value_week'), $('#date_week'), moment().subtract(7, 'days'), moment());
    }

    const setValue = async function (valueDiv, dateDiv, start, end) {
        try {
            let data = await getDataByRange(start, end);
            let total = data.reduce((acc, value) => {
                if (value.diffWeight) {
                    if(typeof value.diffWeight === 'string') {
                        return acc + parseInt(value.diffWeight);
                    }
                    else return acc + value.diffWeight;
                }
                return acc;
            }, 0);
            
            valueDiv.html(`${Math.round(total * 100)/100} kg`);
            dateDiv.html(start.format('DD MMMM YYYY'));
        } catch(e) {
            console.log(e);
        }
    }

    const initReload = function () {
        $('#reload-day').click( function(event) { 
            event.preventDefault();
            setValue($('#value_today'), $('#date_today'), moment(), moment());
            return false; 
        });
    
        $('#reload-graph').click(function (event)  {
            event.preventDefault();
            initGraph();
            return false;
        });
    }

    const initDayGraph = function (mySerie, myLengend, date) {
        if (VC.properties.byDay) {
            let dd = date.getDate();
            let mm = date.getMonth();
            let year = date.getFullYear();
        
            let fromDate = new Date(year, mm, dd, 0, 0, 0);
            let toDate = new Date(year, mm, dd, 23, 0, 0);
            // Initialize chart
            const day_chart = echarts.init(VC.properties.byDay);


            //
            // Chart config
            //

            // Options
            day_chart.setOption({

                // Define colors
                color: ["#424956", "#d74e67", '#0092ff'],

                // Global text styles
                textStyle: {
                    fontFamily: 'Roboto, Arial, Verdana, sans-serif',
                    fontSize: 13
                },

                // Chart animation duration
                animationDuration: 750,

                // Setup grid
                grid: {
                    left: 0,
                    right: 40,
                    top: 35,
                    bottom: 60,
                    containLabel: true
                },

                // Add legend
                legend: {
                    data: myLengend,
                    itemHeight: 8,
                    itemGap: 20
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: [10, 15],
                    textStyle: {
                        fontSize: 13,
                        fontFamily: 'Roboto, sans-serif'
                    }
                },

                // Horizontal axis
                xAxis: [{
                    type: 'time',
                    min: fromDate,
                    max: toDate,
                    boundaryGap: false,
                    axisLabel: {
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    }
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} ',
                        color: '#333'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#eee']
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(0,0,0,0.01)']
                        }
                    }
                }],

                // Zoom control
                dataZoom: [
                    {
                        type: 'inside',
                        start: 30,
                        end: 70
                    },
                    {
                        show: true,
                        type: 'slider',
                        start: 30,
                        end: 70,
                        height: 40,
                        bottom: 0,
                        borderColor: '#ccc',
                        fillerColor: 'rgba(0,0,0,0.05)',
                        handleStyle: {
                            color: '#585f63'
                        }
                    }
                ],

                // Add series
                series: mySerie
            });
        }
    }

    return {
        initGraph,
        initValue,
        initReload
    }
}();

VC.properties = {
    byDay: undefined
}


$(document).ready(async function () {
    VC.initGraph();
    VC.initValue();
    VC.initReload();
});