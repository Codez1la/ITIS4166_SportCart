// modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const cardRoutes = require('./routes/cardRoutes');
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');


const app = express(); // create app


//app config
let port = 8084;
let host = 'localhost';
let url = 'mongodb+srv://Codei:b2v8gTgSiFuPhMQQ@project3.0btqxgu.mongodb.net/nbda-project3?retryWrites=true&w=majority&appName=Project3'
app.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}) // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true (usecreateIndex not supported)
.then(() => {
    //start the server
    app.listen(port, host, () => {
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
//cookies
app.use(session({
    secret: 'ndaslkdasiodasoidhadssa',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge: 24*60*60*1000}, //1 day
    store: new MongoStore({mongoUrl: url})
}));

app.use(flash());

app.use((req, res, next) => {
    // console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

//routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/items', cardRoutes);
app.use('/users', userRoutes);



app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', { error: err });
});