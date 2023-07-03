const mongoose = require("mongoose");

const bookActive = new mongoose.Schema({
  id: {
    type: String,
  },
  books:[
    {
        bookid:{
            type:String,
            required:true
        },
        desc:{
            type:String,
            required:true,
        },
        activity:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
    }
  ],
});

module.exports = mongoose.model("Active", bookActive);
