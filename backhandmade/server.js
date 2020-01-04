const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const giftRoutes = express.Router();
const PORT = 4000;

let Gift = require('./gift.model');

app.use(cors());
app.use(bodyParser.json());

// connect to data base
mongoose.connect('mongodb://127.0.0.1:27017/handgift', {useNewUrlParser: true, useUnifiedTopology: true})
// connection ref
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("mongoDB connection established");
});


// first endpoint
giftRoutes.route('/').get(function(req, res){
  Gift.find(function(err,gifts){
      if(err){
          console.log(err);

      } else {
          console.log(gifts)
          res.json(gifts);
          
      }
  }); 
});

giftRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Gift.findById(id, function(err, gift){
        res.json(gift);
    });
});

giftRoutes.route('/add').post(function(req,res){
    let gift = new Gift(req.body);
    gift.save()
        .then(gift => {
            res.status(200).json({'gift': 'gift added succesfuly'})
        })
        .catch(err => {
            res.status(400).send('adding new gift failed');

        });

        giftRoutes.route('/update/:id').post(function(req, res){
            Gift.findById(req.params.id, function(err, gift){
                if(!gift)
                    res.status(404).send('hheey not found');
                else
                    gift.gift_name = req.body.gift_name
                    gift.gift_url_img = req.body.gift_url_img
                    gift.gift_needs = req.body.gift_needs
                    gift.gift_step = req.body.gift_step

                gift.save().then(gift =>{
                    res.json('gift updated');
                })
                .catch(err => {
                    res.status(400).send("Update not done")
                })
            })
        })

})

app.use('/gifts', giftRoutes);

app.listen(PORT, function(){
    console.log("server runniing")
});
