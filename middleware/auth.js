const Card = require('../models/card');

//check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    }else{
        req.flash('error', 'You are logged in already');
        return res.redirect('/users/profile');
    }
};

//check if user is aauthenticated
exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user){
        return next();
    }else{
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }
};

//check if user is author of the story
exports.isAuthor = (req, res, next) =>{
    let id = req.params.id;

    Card.findById(id)
    .then(card=>{
        if(card){
            if(card.seller == req.session.user){
                return next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else{
            let err = new Error('Cannot find a card with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};