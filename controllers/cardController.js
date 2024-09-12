const model = require('../models/card');
exports.index = (req, res, next) => {
    //search feature
    const query = req.query.search;
    if(query !== undefined){
        const filter = {
            $and: [
                {active: true},
                {
                    $or: [
                        {title : {$regex: query, $options: 'i'}},
                        {description : {$regex: query, $options: 'i'}}
                    ]
                }
            ]
        };

        //filter search
        model.find(filter).sort([['price', 'asc']])
        .then((cards)=>{
            res.render('./card/items', {cards})
        })
        .catch(err=>next(err));

    }else{
        //if no query
        model.find().sort([['price', 'asc']])
        .then((cards)=>{
            res.render('./card/items', {cards})
        })
        .catch(err=>next(err));
    }
    
};

exports.new = (req, res) => {
    res.render('./card/new');
};

exports.create = (req, res, next) => {
    let card = new model(req.body);
    card.seller = req.session.user;
    // image path
    if(req.file !== undefined){
        card.image = '/images/cards/' + req.file.filename; 
    };

    card.save()
    .then(card=>res.redirect('/items'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
       
    model.findById(id).populate('seller', 'firstName lastName')
    .then(card=>{
        if(card){
            res.render('./card/item', { card });
        }else{
            let err = new Error('Cannot find a card with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    
    model.findById(id)
    .then(card=>{
        return res.render('./card/edit', { card });
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next) => {
    let card = req.body;

    if(req.file !== undefined){
        card.image = '/images/cards/' + req.file.filename; 
    };

    let id = req.params.id;

    model.findByIdAndUpdate(id, card, {userFindAndModify: false, runValidators: true})
    .then(card=>{
        req.flash('success', 'You have successfully updated your list item!');  
        res.redirect('/items/' + id);
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    model.findByIdAndDelete(id, {userFindAndModify: false})
    .then(card =>{
        Offer.deleteMany({item: id});
        req.flash('success', 'You have successfully deleted your list item!');  
        res.redirect('/items');
    })
    .catch(err=>next(err));
};