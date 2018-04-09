// Set up
import * as express from 'express';
let app = express();                                    // create our app w/ express
import * as mongoose from 'mongoose';                   // mongoose for mongodb
import {Schema} from "mongoose";
import * as morgan from 'morgan';                       // log requests to the console (express4)
import * as bodyParser from 'body-parser';              // pull information from HTML POST (express4)
import * as methodOverride from 'method-override';      // simulate DELETE and PUT (express4)
import * as cors from 'cors';
import {Review} from './schemas/review';

// Configuration
mongoose.connect('mongodb://localhost/reviewking', {useMongoClient: true});

app.use(morgan('dev'));                                          // log every request to the console
app.use(bodyParser.urlencoded({'extended': true}));             // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                             // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes

// Get reviews
app.get('/api/reviews', function (req, res) {

    console.log("fetching reviews");

    // use mongoose to get all reviews in the database
    Review.find(function (err, reviews) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            return res.send(err);
        }

        res.json(reviews); // return all reviews in JSON format
    });
});

// create review and send back all reviews after creation
app.post('/api/reviews', function (req, res) {
    console.log("creating review");
    console.log("BODY", req.body);

    // create a review, information comes from request from Ionic
    Review.create({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        done: false
    }, function (err: any, review: any) {
        if (err) {
            res.send(err);
        }

        // get and return all the reviews after you create another
        Review.find(function (err: any, reviews: any) {
            if (err)
                return res.send(err);
            res.json(reviews);
        });
    });

});

// delete a review
app.delete('/api/reviews/:review_id', function (req, res) {
    Review.remove({
        _id: req.params.review_id
    }, function (err: any) {

    });
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
