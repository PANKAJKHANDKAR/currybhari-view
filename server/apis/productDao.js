var cors = require('cors');
var product = require('../database/modals/Product');
var mock = require('../debug/fetch');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

var debug = false;

var convertToMoney = function(num) {
    return (num / 100).toFixed(2);
}

module.exports = function(app) {
    app.get('/products', cors(corsOptions), function(req, res) {
        if (debug === false) {
            product.find().exec(function(error, products) {
                if (error) {
                    return res.status(500).send(error);
                }

                // products.forEach(function(product) {
                //     product.rate = convertToMoney(product.rate);
                // });

                return res.status(200).json(products);
            });
        } else {
            mock.fetchMock('products', function(data) {
                return res.status(200).json(data);
            });

        }
    });

    app.get('/product/:id', cors(corsOptions), function(req, res) {
        if (debug === false) {
            product.findById(req.params.id, function(error, product) {
                if (error) {
                    return res.status(500).send(error);
                }
                //product.rate = convertToMoney(product.rate);

                return res.status(200).json(product);
            });
        } else {
            mock.fetchMock('product', function(data) {
                return res.status(200).json(data);
            });
        }
    });
};
