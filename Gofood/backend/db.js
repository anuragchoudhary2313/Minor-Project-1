const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gofood';

// Mock fallback data for development when MongoDB is unavailable
const mockFoodData = [
    { CategoryName: "Biryani", name: "Chicken Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500", options: [{ half: "120", full: "230" }], description: "Aromatic chicken biryani" },
    { CategoryName: "Biryani", name: "Veg Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500", options: [{ half: "100", full: "180" }], description: "Vegetable biryani" },
    { CategoryName: "Pizza", name: "Margherita", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500", options: [{ regular: "200", medium: "350", large: "450" }], description: "Classic margherita" },
    { CategoryName: "Starter", name: "Paneer Tikka", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500", options: [{ half: "80", full: "150" }], description: "Grilled paneer" }
];

const mockCategoryData = [
    { CategoryName: "Biryani" },
    { CategoryName: "Pizza" },
    { CategoryName: "Starter" }
];

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
        console.warn('⚠️  MongoDB Connection Failed:', err.message);
        console.warn('   Using mock/fallback data for development');
        console.warn('   To use live data:');
        console.warn('   1. MongoDB Atlas: Add 0.0.0.0/0 to IP whitelist');
        console.warn('   2. Check MONGO_URI in .env');
        console.warn('   3. Verify network connectivity\n');
        
        // Return mock data to allow server to start
        return { foodData: mockFoodData, categoryData: mockCategoryData };
    }
};

module.exports = connectDB;
