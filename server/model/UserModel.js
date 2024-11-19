const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    imageUrl: Joi.string().uri().optional(),
});

const validateUser = (user) => {
    return userSchema.validate(user);
}


const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    validateUser,
};