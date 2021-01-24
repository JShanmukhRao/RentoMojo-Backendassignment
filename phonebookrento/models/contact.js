const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types.ObjectId;
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
  postedBy: {
    type: ObjectId,
    ref: "User",
    required:true
  },

});

 mongoose.model('Contact', ContactSchema);
