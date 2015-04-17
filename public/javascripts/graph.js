$(function() {
    // var timeEST = [];
    // var result = [];
    // var resultUTC = [];
    // for (var i = 0; i < data.length; ++i){
    //     timeEST[i] = time[i] - 60 * 60 * 1000 * 5;
    //     result.push([timeEST[i], data[i]]);
    //     resultUTC.push([time[i], data[i]]);
    //     resultUTC[i][0] = moment(resultUTC[i][0]);
    //     resultUTC[i][0] = resultUTC[i][0].format("ddd MMM D hh:mm a");
    // }

    // var container = $("#placeholder");

    // series = [{
    //     data: result,
    //     label: 'Data'
    // }];

    // var plot = $.plot(container, series, {
    //     series: {
    //         lines: {
    //             show: true
    //         },
    //         points: {
    //             show: true
    //         }
    //     },
    //     xaxis: {
    //             mode: "time",
    //             tickLength: 5,
    //             timeformat: "%b %e %H:%M",
    //             monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    //     },
    //     grid: {
    //         borderWidth: 1,
    //         hoverable: true,
    //         minBorderMargin: 20,
    //         labelMargin: 10,
    //         backgroundColor: {
    //             colors: ["#fff", "#ffffe5"]
    //         },
    //         margin: {
    //             top: 8,
    //             bottom: 20,
    //             left: 20
    //         },
    //         markings: function(axes) {
    //             var markings = [];
    //             var xaxis = axes.xaxis;
    //             for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
    //                 markings.push({
    //                     xaxis: {
    //                         from: x,
    //                         to: x + xaxis.tickSize
    //                     },
    //                     color: "rgba(232, 232, 255, 0.2)"
    //                 });
    //             }
    //             return markings;
    //         }
    //     },
    //     yaxis: {
    //         min: 0,
    //         max: 110
    //     },
    //     legend: {
    //         show: true
    //     },
    //     tooltip: true,
    //     tooltipOpts: {
    //         content: "%s at %x.0 is %y",
    //         shifts: {
    //             x: -60,
    //             y: 25
    //         },
    //         xDateFormat: "%m/%d %H:%M EST",
    //     }
    // });

        // We use an inline data source in the example, usually data would
        // be fetched from a server

    var data = [],
        totalPoints = 300;

    function getRandomData() {

        if (data.length > 0)
            data = data.slice(1);

        // Do a random walk

        while (data.length < totalPoints) {

            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + Math.random() * 10 - 5;

            if (y < 0) {
                y = 0;
            } else if (y > 100) {
                y = 100;
            }

            data.push(y);
        }

        // Zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }

    // Set up the control widget

    var updateInterval = 100;
    // $("#updateInterval").val(updateInterval).change(function () {
    //     var v = $(this).val();
    //     if (v && !isNaN(+v)) {
    //         updateInterval = +v;
    //         if (updateInterval < 1) {
    //             updateInterval = 1;
    //         } else if (updateInterval > 2000) {
    //             updateInterval = 2000;
    //         }
    //         $(this).val("" + updateInterval);
    //     }
    // });

    var plot = $.plot("#placeholder", [ getRandomData() ], {
        series: {
            shadowSize: 0   // Drawing is faster without shadows
        },
        yaxis: {
            min: 0,
            max: 100
        },
        xaxis: {
            show: false
        }
    });

    function update() {

        plot.setData([getRandomData()]);

        // Since the axes don't change, we don't need to call plot.setupGrid()

        plot.draw();
        setTimeout(update, updateInterval);
    }

    update();


    // $('#dataTables-example').dataTable({
    //     "data": data,
    //     'searching': false,
    //     "columns": [
    //         { "title": "Time" },
    //         { "title": "Value" },
    //     ]
    // });
});