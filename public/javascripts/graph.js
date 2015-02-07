$(function() {
    var timeEST = [];
    var result = [];
    var resultUTC = [];
    for (var i = 0; i < data.length; ++i){
        timeEST[i] = time[i] - 60 * 60 * 1000 * 5;
        result.push([timeEST[i], data[i]]);
        resultUTC.push([time[i], data[i]]);
        resultUTC[i][0] = moment(resultUTC[i][0]);
        resultUTC[i][0] = resultUTC[i][0].format("ddd MMM D hh:mm a");
    }

    var container = $("#placeholder");

    series = [{
        data: result,
        label: 'Data'
    }];

    var plot = $.plot(container, series, {
        series: {
            lines: {
                show: true
            },
            points: {
                show: true
            }
        },
        xaxis: {
                mode: "time",
                tickLength: 5,
                timeformat: "%b %e %H:%M",
                monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        grid: {
            borderWidth: 1,
            hoverable: true,
            minBorderMargin: 20,
            labelMargin: 10,
            backgroundColor: {
                colors: ["#fff", "#ffffe5"]
            },
            margin: {
                top: 8,
                bottom: 20,
                left: 20
            },
            markings: function(axes) {
                var markings = [];
                var xaxis = axes.xaxis;
                for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                    markings.push({
                        xaxis: {
                            from: x,
                            to: x + xaxis.tickSize
                        },
                        color: "rgba(232, 232, 255, 0.2)"
                    });
                }
                return markings;
            }
        },
        yaxis: {
            min: 0,
            max: 110
        },
        legend: {
            show: true
        },
        tooltip: true,
        tooltipOpts: {
            content: "%s at %x.0 is %y",
            shifts: {
                x: -60,
                y: 25
            },
            xDateFormat: "%m/%d %H:%M EST",
        }
    });


    $('#dataTables-example').dataTable({
        "data": resultUTC,
        'searching': false,
        "columns": [
            { "title": "Time" },
            { "title": "Value" },
        ]
    });
});