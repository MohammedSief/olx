const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productTitle: { type: String, required: true },
    productDesc: { type: String, required: true },
    productPrice: { type: Number },
    likes: [{ type: mongoose.Schema.Types.ObjectId }],
    createdBy: {type: refId},
    hidden: { type: mongoose.Schema.Types.Boolean, default: false },
    isDeleted: { type: mongoose.Schema.Types.Boolean, default: false },
    comments: { type: mongoose.Schema.Types.ObjectId },
    wishList: { type: mongoose.Schema.Types.ObjectId },
}, {
    timestamps: true
})


const productModel = mongoose.model('Product', productSchema)

module.exports = { productModel }