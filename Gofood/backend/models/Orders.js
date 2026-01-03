const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    order_data: {
        type: Array,
        required: true,
        default: []
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// Index for faster queries by email
OrderSchema.index({ email: 1 });
OrderSchema.index({ createdAt: -1 }); // For sorting by date

module.exports = mongoose.model('order', OrderSchema);