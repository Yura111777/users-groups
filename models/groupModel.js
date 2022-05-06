const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Group must have name. Please add name'],
            unique: true
        },
        description: {
            type: String,
        },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

groupSchema.virtual('users', {
    ref: 'User',
    foreignField: 'group',
    localField: '_id'
})

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;