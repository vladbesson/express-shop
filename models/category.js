const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  description: String,
},
{
  versionKey: false,
});

module.exports = mongoose.model('category', categorySchema);
