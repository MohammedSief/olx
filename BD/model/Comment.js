const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentBody: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId :{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
}, {
    timestamps: true
})


const commentModel = mongoose.model('Comment', commentSchema);

module.exports = commentModel