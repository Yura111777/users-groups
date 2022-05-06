const mongoose = require('mongoose');

const userSchema  = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add name for user field'],
        minLength: 4
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group',
    },
})
userSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'group',
        select: 'name'
    });

    next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
