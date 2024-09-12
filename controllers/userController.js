const User = require('../models/user');
const Card = require('../models/card');
const Offer = require('../models/offer');


//get signup form
exports.new = (req, res)=>{
    res.render('./user/new');
};

//create a new user
exports.create = (req, res, next)=>{
    let user = new User(req.body);
    if(user.email)
        user.email = user.email.toLowerCase();
    user.save()
    .then(user=>res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/users/new');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('/users/new');
        }
        next(err)
    });
};


exports.getUserLogin = (req, res, next) => {
    return res.render('./user/login'); 
}

exports.login = (req, res, next)=>{
    //auth users login req
    let email = req.body.email;
    if(email)
        email = email.toLowerCase();
    let password = req.body.password;
    //get user that matches email
    User.findOne({email: email})
    .then(user=>{
        if(!user){
            req.flash('error', 'wrong email address');  
            res.redirect('/users/login');
        }else{
            user.comparePassword(password) //user found in db
            .then(result => {
                if(result){
                    req.session.user = user._id; //store users id in the session
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
                }else{
                    req.flash('error', 'Wrong Password!');
                    res.redirect('/users/login');
                }
            });
        }
    })
    .catch(err=>next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([User.findById(id), Card.find({seller: id}), Offer.find({user: id}).populate('item').lean()])
    .then(results=>{
        const [user, cards, offers] = results;
        // console.log(cards);
        res.render('./user/profile', {user, cards, offers});
    })
    .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
};



