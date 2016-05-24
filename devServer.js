var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/comments', function (req, res) {
    fs.readFile(COMMENTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/comments', function (req, res) {
    fs.readFile(COMMENTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        var newComment = {
            id: Date.now(),
            author: req.body.author,
            comment: req.body.comment,
            del:false
        };
        comments.push(newComment);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});


app.delete('/api/comments', function (req, res) {
    fs.readFile(COMMENTS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        var comment;
        _.set(comments,'['+_.findIndex(comments,_comment=>{comment =_comment; return _comment.id==req.body.id})+'].del',true);
        
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comment);
        });
    });
});

app.get('', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:3000');
});