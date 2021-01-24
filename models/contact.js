const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
 
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },

});

 mongoose.model('Contact', ContactSchema);
