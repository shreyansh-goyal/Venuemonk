const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    username:{
      type: String,
      required:true
    },
    comments:{
      type:Array,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
