var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = express.Router(),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;

var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);
var db;
MongoClient.connect('mongodb://localhost:27017/ems', function (err, database) {
    if (err) {
        console.log('could not connect to database');
    }
    db = database;
    console.log('connect to db successfully..');
});


router.get('/', function (req, res) {
    res.status(200).send("Server is up...");
});

router.get('/users/:userId', function (req, res) {
    if (!req.params.userId) {
        res.status(200).json({message: 'userId is required..'});
    }
    db.collection('users').findOne({_id: req.params.userId}, function (err, user) {
        if (err) {
            return res.status(500).json({message: 'error while fetching user by userId'});
        }
        res.status(200).json(user);
    });
});

router.get('/users', function (req, res) {
    db.collection('users').find().toArray(function (err, users) {
        if (err) {
            return res.stats(500).json({message: 'error while fetching users'});
        }
        res.status(200).json(users);
    });
});

router.post('/users', function (req, res) {
    var input = req.body;
    input._id = new ObjectID().toHexString();
    db.collection('users').insertOne(input, function (err, result) {
        if (err) {
            return res.status(500).json({message: 'error while saving data'});
        }
        res.status(200).json({message: 'saved successfully'});
    });
});

router.put('/users/:userId', function (req, res) {
    var input = req.body;
    var userId = req.params.userId;
    db.collection('users').updateOne({_id: userId}, {$set: input}, function (err, result) {
        if (err) {
            return res.status(500).json({message: 'error while saving data'});
        }
        res.status(200).json({message: 'updated successfully '});
    });
});

router.delete('/users/:userId', function (req, res) {
    var userId = req.params.userId;
    db.collection('users').deleteOne({_id: userId}, function (err, result) {
        if (err) {
            return res.status(500).json({message: 'error while deleting user'});
        }
        res.status(200).json({message: 'user delete successfully'});
    });
});

app.listen(PORT, function () {
    console.log('Server is running on ' + PORT);
});
