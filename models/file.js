const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  
  fileName: {
    type: String,
    trim: true,
    required:true,
  },
  date:{
      type:Date,
      required:true
  },
  creator:{
      type:String,
      trim:true,
      required:true
  },
  changes:{
      type:Array,
      change:{
          type:Object
      },
      default:"none"
  }
//   filePath:{
//     type:String,
//     required:true,
//   },
//   belonging:{
//     required:true,
//     type:String
//   },
//    dateAdded:{
//       type:String,
//       default: Date()
//     }
  
  
});

const File = mongoose.model('File', fileSchema);

module.exports = File;