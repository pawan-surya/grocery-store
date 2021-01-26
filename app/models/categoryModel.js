const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Category', categorySchema);

