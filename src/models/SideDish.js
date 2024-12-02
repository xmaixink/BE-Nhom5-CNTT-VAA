let mongoose = require('mongoose');

let SideDishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  availability: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true, collection: 'side_dishes' });

module.exports = mongoose.model('SideDish', SideDishSchema);
