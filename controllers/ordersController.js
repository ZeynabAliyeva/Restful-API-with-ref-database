const { orders } = require('../models/ordersModel');

const OrdersController = {
	getAll: (req, res) => {
		let { limit, sort, startdate, enddate } = req.query;
		if (!startdate) {
			startdate = new Date(0);
		} else {
			startdate = new Date(startdate);
		}

		if (!enddate) {
			enddate = new Date();
		} else {
			enddate = new Date(enddate);
		}
		orders
			.find({
				isDeleted: false,
				date: {
					$gte: startdate,
					$lte: enddate,
				},
			})
			.limit(limit)
			.sort({ productPrice: sort })
			.populate('categoryId')
			.populate({ path: 'buyerId', populate: { path: 'buyerAdress' } })
			.exec((err, docs) => {
				if (!err) {
					res.json(docs);
				} else {
					res.status(500).json(err);
				}
			});
	},
	add: (res, req) => {
		let newProduct = new orders({
			productName: req.body.productName,
			productPrice: req.body.productPrice,
			productDescription: req.body.productDescription,
			categoryId: req.body.categoryId,
			buyerId: req.body.buyerId,
			isDeleted: false,
		});

		newProduct.save((err, doc) => {
			if (!err) res.json(doc);
			else res.status(500).json(err);
		});
	},
	getById: (req, res) => {
		let id = req.params.id;
		orders.findById(id, (err, doc) => {
			if (!err) res.json(doc);
			else res.status(500).json(err);
		});
	},
	delete: (req, res) => {
		let id = req.params.id;
		orders.findByIdAndUpdate(id, { isDeleted: true }, { new: true }, (err, doc) => {
			if (!err) res.json(doc);
			else res.status(500).json(err);
		});
	},
	update: (req, res) => {
		let id = req.params.id;
		orders.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true }, (err, doc) => {
			if (!err) res.json(doc);
			else res.status(500).json(err);
		});
	},
};

module.exports = {
	OrdersController,
};
