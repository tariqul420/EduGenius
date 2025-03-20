const { default: mongoose } = require("mongoose");

// create blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  instructor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default:Date.now,
    required: true,
  },
  detailButton: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    required: true,
  },
});
// create blog model
const Blog = mongoose.model("Blog", blogSchema);
// export blog model    
module.exports = Blog;
 