const { Schema, default: mongoose } = require('mongoose');

const buyerSchema = Schema({
	buyerName: String,
	phoneNumber: Number,
	buyerAddress: {
		type: 'ObjectId',
		ref: 'Address',
	},
	isDeleted: Boolean,
	date: {
		type: Date,
		default: Date(),
	},
});

const buyer = mongoose.model('Buyer', buyerSchema);

module.exports = {
	buyer,
};
