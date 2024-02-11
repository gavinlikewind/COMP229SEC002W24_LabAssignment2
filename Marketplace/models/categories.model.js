const mongoose = require("mongoose");
const categoriesSchema = mongoose.Schema({
    name:{type: String, trim: true, required: "Category Name is required."}
});

module.exports = mongoose.model("categories", categoriesSchema);
