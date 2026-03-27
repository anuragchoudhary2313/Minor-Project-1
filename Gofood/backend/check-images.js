const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

async function checkDatabase() {
    try {
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        const foodItems = await db.collection('food_items').find({}).toArray();
        
        console.log(`Found ${foodItems.length} items.`);
        
        // Print first 20 items to check images
        foodItems.slice(0, 20).forEach(item => {
            console.log(`- ${item.name}: ${item.img}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

checkDatabase();
