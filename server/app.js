module.exports = function () {
    var express = require('express'),
        uglifyMiddleware = require('express-uglify-middleware'),
        lessMiddleware = require('less-middleware'),
        compress = require('compression'),
        path = require('path'),
        app = express();

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(uglifyMiddleware({
        src: path.join('', __dirname, '../client'),
        dest: path.join('', __dirname, '/public/javascripts'),
        prefix: "/public/javascripts",
        compressFilter: /\.js$/,
        compress: true,
        force: false,
    }));


    // Zip the things
    app.use(compress());
    
    app.use("/public/stylesheets/", express.static(path.join(__dirname , "../build")));
    app.use("/public/js/", express.static(path.join(__dirname , "../build")));
    app.use("/public", express.static(__dirname + "/public"));
    app.use("/public/components", express.static(path.join(__dirname, "../components")));
    app.use("/public/fonts/", express.static(path.join(__dirname , "../components/fontawesome/fonts")));

    app.disable('x-powered-by');
    app.get('/', function (req, res) {
        res.render('index/index', {
            host: req.host
        });
    });
    var port = Number(process.env.PORT || 5000);
    console.log('express is booting on port ' + port);
    app.listen(port);
};
