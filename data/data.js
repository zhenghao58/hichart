function trim (data) {
    if (data.length) {
    data = data.slice(1);
    }
    return data;
}

module.exports = function(data){

    var maximum = 50;
    data=trim(data);
    while (data.length < maximum) {
        var previous = data.length ? data[data.length - 1] : 50;
        var y = previous + Math.random() * 20 - 10;
        y=Number(y.toFixed(2));
        data.push(y < 0 ? 0 : y > 100 ? 100 : y);

    }
    // zip the generated y values with the x values
    return data;
}
