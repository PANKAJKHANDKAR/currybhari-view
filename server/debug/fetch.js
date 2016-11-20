var fs = require('fs');

var debugFetchConfig = {};

debugFetchConfig['productDetails'] = 'products.json';


exports.fetchMock = function(api, callback) {
    var readFile = function(filename, callback) {
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            callback(data);
        });
    };

    var defaultPath = 'server/debug/json/';

    readFile(defaultPath + debugFetchConfig['productDetails'], callback);
};