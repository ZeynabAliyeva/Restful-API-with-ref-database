const { Schema, default: mongoose } = require('mongoose');

const ordersSchema = Schema({
	productName: String,
	categoryID: {
		type: 'ObjectId',
		ref: 'Category',
	},
	productPrice: Number,
	productDescription: String,
	buyerID: {
		type: 'ObjectId',
		ref: 'Buyer',
	},
	isDeleted: Boolean,
	date: {
		type: Date,
		default: Date(),
	},
});

const orders = mongoose.model('Orders', ordersSchema);

module.exports = {
	orders,
};
