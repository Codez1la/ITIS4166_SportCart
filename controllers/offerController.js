const Offer = require('../models/offer');
const Card = require('../models/card');

exports.create = (req, res, next) => {
    let id = req.params.id;

    Card.findByIdAndUpdate({_id:id},{ $max: {highestOffer: req.body.offer} },{userFindAndModify: false, runValidators: true})
        .then(card => {
            if (!card) {
                let err = new Error('Cannot find a card with id ' + id);
                err.status = 404;
                throw err;
            }
            if (card.seller.equals(req.session.user)) {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                throw err;
            }

            let offer = new Offer({
                user: req.session.user,
                item: id,
                amount: req.body.offer
            });
            offer.save()
            .then(()=>{
                req.flash('success', 'You have created an Offer');
            })
            .catch();
            // console.log(offer);
        
            // console.log(card);
            card.totalOffers += 1;
            console.log(card);
            card.save().then().catch();
            res.redirect('/items/' + id);
        }) 
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
};

exports.view = (req, res, next) => {
    let id = req.params.id; // this
    Promise.all([Card.findById(id), Offer.find({item: id}).populate("user", "firstName lastName").lean()])
    .then(results=>{
        const [cards, offers] = results;
        res.render('./offer/offers', {cards, offers});
    })
    .catch(err=>next(err));
};


exports.accept = (req, res, next) => {
    let id = req.params.id; //item id
    console.log(req.params.id);
    Offer.find({item: id, _id: id})
    .then(offer=>{
        if(offer){
            console.log(offer);
            
        }
    }).catch();

    // Offer.updateMany({item: offer.item._id, _id: {$ne: id}}, {status:'rejected'})

    // Card.findByIdAndUpdate(offer.item._id, {active: false}).then().catch();

    //id of the item
    //id of the offer
    //grab offerfindandupdate 
    // passin offer id, status :accepted
    //item.findbyidandup(id)
    //fields to false
    //offers updatemini
    // pass in id
    // pass status: pending
    // all others rejected
    //redirect to item
};
