$(function() {
    for (var i = 0; i < time.length; ++i) {
        time[i] -= 60 * 60 * 1000 * 5;
    }
    var result = [];
    for (var i = 0; i < data.length; ++i){
        result.push([time[i], data[i]])
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
                tickLength: 5
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
            xDateFormat: "%H:%M EST",
        }
    });

    for (var i = 0; i < result.length; ++i) {
        result[i][0]+= 60 * 60 * 1000 * 5;
        result[i][0] = moment(result[i][0]);
        result[i][0] = result[i][0].format("ddd MMM D hh:mm a");
    }

    $('#dataTables-example').dataTable({
        "data": result,
        'searching': false,
        "columns": [
            { "title": "Time" },
            { "title": "Value" },
        ]
    });
});