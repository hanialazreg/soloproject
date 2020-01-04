const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Gift = new Schema ({
    gift_name: {
        type: String
    },
    gift_url_img: {
        type: String
    },
    gift_needs: {
        type: String
    },
    gift_step:{
        type: String
    }

});

module.exports = mongoose.model('Gift', Gift );