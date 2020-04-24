const VC = function () {
    const getDayByDay = async function (date) {
        // let today = new Date();
        let dd = date.getDate();
        let mm = date.getMonth();
        let year = date.getFullYear();
    
        let fromDate = new Date(year, mm, dd, 0, 0, 0);
        let toDate = new Date(year, mm, dd, 23, 0, 0);
        let data = await BioReactor.getByDay({
            "fromDate": fromDate.getTime(),
            "toDate": toDate.getTime()
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
        let data = await getDayByDay(new Date());
        let { series, legend } = convertData(data);
        initDayGraph(series, legend, new Date());
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
        initGraph
    }
}();

VC.properties = {
    byDay: undefined
}


$(document).ready(async function () {
    VC.initGraph();
});