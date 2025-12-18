import mongoose from "mongoose";

export default  courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

        
