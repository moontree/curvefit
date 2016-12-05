var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var filename = 'routes/calculate.py';
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/curvefit',function(req, res, next){
    var data = JSON.parse(req.body["data"]);
    console.log(data);
    exec('python ' + filename + ' [' + data.x_values + '] ['
        + data.y_values + '] ' + data.poly,
        function(err, stdout, stderr){
        if(err){
            console.log('stderr',err);
            res.send({
                error : err,
            });
        }
        if(stdout){
            var coefficients = JSON.parse(stdout);
            var len = coefficients.length;
            var square_res = 0;
            var square_total = 0;
            var y_sum = 0;
            for(var i = 0; i < data.x_values.length; i ++){
                y_sum += data.y_values[i];
            }
            var y_average = y_sum / data.x_values.length;
            for(var i = 0; i < data.x_values.length; i ++){
                var new_y = 0;
                for(var j = 0; j < len; j ++){
                    new_y += Math.pow(data.x_values[i], len - 1 - j) * parseFloat(coefficients[j]);
                }
                square_res += Math.pow(new_y - data.y_values[i], 2);
                square_total +=  Math.pow(y_average - data.y_values[i], 2);
            }
            var square_sum = 1 - square_res/square_total;
            res.send({
                coefficients : coefficients.toString(),
                square_sum : square_sum
            });
        }
    });
});
module.exports = router;
