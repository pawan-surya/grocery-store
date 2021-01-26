const express = require('express');
const Product = require('../models/productModel');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const e = require('cors');

module.exports.indexProduct = (req, res, next) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const startIndex = (page - 1) * limit;
    Product.find()
        .select('name categoryID')
        .populate({ path: 'category', select: { name: 'name' } })
        .limit(parseInt(limit))
        .skip(startIndex)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                product: docs
            };
            res.status(200).json({ status_code: 200, data: response });
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};


module.exports.addProduct = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        category: req.body.categoryID
    });
    product.save().then(result => {
        const createProduct = {
            _id: result._id,
            name: result.name,
            price: result.price,
            categoryId: result.categoryID
        }
        res.status(200).json({ message: 'Product create successfully.', createProduct: createProduct })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
};


module.exports.ShowProduct = (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: 'Not found.' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};


module.exports.updateProduct = (req, res, next) => {
    const id = req.params.productId
    console.log(req.body)
    Product.update({ _id: id }, { $set: req.body }).exec()
        .then(result => {
            console.log(result)
            res.status(200).json({ message: 'product updted.' })
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
};


module.exports.removeProduct = (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted.', request:
                {
                    type: 'DELETE',
                    url: 'http://localhost:4004/products'
                }
            })
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
};