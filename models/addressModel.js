const { Schema, default: mongoose } = require('mongoose');

const addressShema = Schema({
	streetName: String,
	city: String,
	region: String,
	postalCode: String,
	isDeleted: Boolean,
	date: {
		type: Date,
		default: Date(),
	},
});

const address = mongoose.model('Address', addressShema);

module.exports = {
	address,
};
