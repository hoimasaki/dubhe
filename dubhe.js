/*=============================================================================
#     FileName: app.js
#         Desc:
#       Author: Anakin Tu
#        Email: htu@sse.com.cn
#     HomePage: https://git.cbpass.com/dubhe
#      Version: 0.0.1
#   LastChange: 2017-09-18 09:25:44
#      History:
=============================================================================*/

var express = require('express');
var app = express();

app.use('/',express.static('dist/in'));
app.use('/out',express.static('dist/out'));

app.get('/**', function(req, res) {
    res.sendfile('dist/in/index.html');
});

app.listen(8200, function () {
  console.log('Dubhe app listening on port 8200!');
});
