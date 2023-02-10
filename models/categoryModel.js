const { Schema, default: mongoose } = require('mongoose');

const categorySchema = Schema({
	categoryName: String,
	categoryDescription: String,
	isDeleted: Boolean,
	date: {
		type: Date,
		default: Date(),
	},
});

const category = mongoose.model('Category', categorySchema);

module.exports = {
	category,
};
