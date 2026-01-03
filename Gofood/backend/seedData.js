const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const foodItems = [
    {
        CategoryName: "Biryani",
        name: "Chicken Biryani",
        img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
        options: [{ half: "120", full: "230" }],
        description: "Aromatic chicken biryani with basmati rice"
    },
    {
        CategoryName: "Biryani",
        name: "Veg Biryani",
        img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
        options: [{ half: "100", full: "180" }],
        description: "Flavorful vegetable biryani"
    },
    {
        CategoryName: "Pizza",
        name: "Margherita Pizza",
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
        options: [{ regular: "200", medium: "350", large: "450" }],
        description: "Classic margherita with fresh basil"
    },
    {
        CategoryName: "Pizza",
        name: "Pepperoni Pizza",
        img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
        options: [{ regular: "250", medium: "400", large: "550" }],
        description: "Loaded with pepperoni"
    },
    {
        CategoryName: "Starter",
        name: "Paneer Tikka",
        img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500",
        options: [{ half: "80", full: "150" }],
        description: "Grilled paneer with spices"
    },
    {
        CategoryName: "Starter",
        name: "Chicken Wings",
        img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500",
        options: [{ half: "100", full: "180" }],
        description: "Crispy chicken wings"
    }
];

const categories = [
    { CategoryName: "Biryani" },
    { CategoryName: "Pizza" },
    { CategoryName: "Starter" },
    { CategoryName: "Dessert" }
];

async function seedDatabase() {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        
        // Clear existing data
        await db.collection('food_items').deleteMany({});
        await db.collection('Categories').deleteMany({});
        
        // Insert new data
        await db.collection('food_items').insertMany(foodItems);
        await db.collection('Categories').insertMany(categories);
        
        console.log('✅ Database seeded successfully!');
        console.log(`   ${foodItems.length} food items added`);
        console.log(`   ${categories.length} categories added`);
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Error seeding database:', err.message);
        process.exit(1);
    }
}

seedDatabase();
