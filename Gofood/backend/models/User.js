const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [5, 'Password must be at least 5 characters'],
        select: false // Don't return password by default
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// Index already created by unique: true on email field (duplicate removed)
// UserSchema.index({ email: 1 });

module.exports = mongoose.model('user', UserSchema);