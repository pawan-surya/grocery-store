const express = require('express');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

module.exports.indexCategory = (req, res, next) => {

    Category.find()
        .select('name _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                category: docs
            };
            res.status(200).json({ status_code: 200, data: response });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};


module.exports.addCategory = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    category.save().then(result => {
        const createCategory = {
            _id: result._id,
            name: result.name,
            price: result.price
        }
        res.status(200).json({ status_code: 200, message: 'Category create successfully.', data: createCategory })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
}

module.exports.showCategory = (req, res, next) => {
    const id = req.params.categoryId
    Category.findById(id)
        .select('_id name quantity')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({ status_code: 200, data: doc })
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
}

module.exports.updateCategory = (req, res, next) => {
    const id = req.params.categoryId
    Category.update({ _id: id }, { $set: req.body }).exec()
        .then(result => {
            console.log(result)
            res.status(200).json({ status_code: 201, message: 'Category Updated.' })
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
}

module.exports.deleteCategory = (req, res, next) => {
    const id = req.params.categoryId
    Category.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                status_code: 202,
                message: 'Category Deleted.', request:
                {
                    type: 'DELETE',
                    url: 'http://localhost:4004/category/:categoryId'
                }
            })
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
}