const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gofood';

// Modern async/await approach
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ MongoDB Connected Successfully');
        
        // Fetch food data and categories
        const foodCollection = mongoose.connection.db.collection('food_items');
        const categoryCollection = mongoose.connection.db.collection('Categories');
        
        const foodData = await foodCollection.find({}).toArray();
        const categoryData = await categoryCollection.find({}).toArray();
        
        return { foodData, categoryData };
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.error('⚠️  Please check:');
        console.error('   1. MongoDB Atlas IP whitelist (add 0.0.0.0/0 for development)');
        console.error('   2. Database credentials are correct');
        console.error('   3. Network connectivity');
        process.exit(1);
    }
};

module.exports = connectDB;
