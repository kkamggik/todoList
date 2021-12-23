const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const listSchema = new Schema({
    description: { type: String, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});
const List = mongoose.model('List', listSchema);

module.exports = List;