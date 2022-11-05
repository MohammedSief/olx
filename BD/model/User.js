const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    coverPic: { type: String },
    qrCode: String,
    confirmEmail: { type: mongoose.Schema.Types.Boolean , default: false }, //using npm i nodejs-nodemailer-outlook
    wishList: { type: mongoose.Schema.Types.ObjectId },
    isDeleted: { type: mongoose.Schema.Types.Boolean, default: false },
    role: { type: String , default:"User"}
}, {
    timestamps: true
})



userSchema.pre('save', async function (next) {
    console.log(this);
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound));
    // hashing with salt round 8
    // + use "parseInt" in order to convert the string which come from .env file
    // into a number to be used as a saltRound
    console.log(this); // log again after hashing
    next();
});


const userModel = mongoose.model('User', userSchema)

module.exports = {userModel}