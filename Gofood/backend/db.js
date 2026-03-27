const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gofood';

// All food items deleted - empty array
const seedFoodItems = [
    // BIRYANI (5 items)
    { CategoryName: "Biryani", name: "Hyderabadi Chicken Biryani", img: "/images/food/biryani_egg.png", description: "Spicy chicken biryani with premium basmati rice.", options: [{ half: "200", full: "380" }], isVeg: false },
    { CategoryName: "Biryani", name: "Lucknowi Mutton Biryani", img: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=500&auto=format&fit=crop", description: "Aromatic mutton biryani with fragrant spices.", options: [{ half: "250", full: "450" }], isVeg: false },
    { CategoryName: "Biryani", name: "Vegetable Biryani", img: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Mixed vegetables in layered rice.", options: [{ full: "200" }], isVeg: true },
    { CategoryName: "Biryani", name: "Paneer Tikka Biryani", img: "/images/food/pizza_paneer.png", description: "Tandoori paneer with basmati rice.", options: [{ full: "220" }], isVeg: true },
    { CategoryName: "Biryani", name: "Seafood Biryani", img: "https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Fresh fish and shrimp biryani.", options: [{ full: "300" }], isVeg: false },

    // PIZZA (5 items)
    { CategoryName: "Pizza", name: "Margherita", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop", description: "Classic tomato, mozzarella and basil.", options: [{ regular: "199", medium: "299", large: "399" }], isVeg: true },
    { CategoryName: "Pizza", name: "Pepperoni", img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop", description: "Loaded with pepperoni and cheese.", options: [{ regular: "249", medium: "349", large: "449" }], isVeg: false },
    { CategoryName: "Pizza", name: "Veggie Supreme", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop", description: "Bell peppers, onions, mushrooms and olives.", options: [{ regular: "229", medium: "329", large: "429" }], isVeg: true },
    { CategoryName: "Pizza", name: "Chicken Deluxe", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop", description: "Grilled chicken with BBQ sauce.", options: [{ regular: "279", medium: "379", large: "479" }], isVeg: false },
    { CategoryName: "Pizza", name: "Four Cheese", img: "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Mozzarella, cheddar, parmesan and feta.", options: [{ regular: "269", medium: "369", large: "469" }], isVeg: true },

    // STARTER (5 items)
    { CategoryName: "Starter", name: "Paneer Tikka", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop", description: "Marinated paneer chunks grilled to perfection.", options: [{ plate: "220" }], isVeg: true },
    { CategoryName: "Starter", name: "Chicken Seekh Kebab", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop", description: "Minced chicken skewers with spices.", options: [{ plate: "280" }], isVeg: false },
    { CategoryName: "Starter", name: "Spring Rolls", img: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=500&auto=format&fit=crop", description: "Crispy rolls with vegetable filling.", options: [{ plate: "150" }], isVeg: true },
    { CategoryName: "Starter", name: "Fish Fry", img: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Battered and fried fish fillets.", options: [{ plate: "320" }], isVeg: false },
    { CategoryName: "Starter", name: "Hara Bhara Kebab", img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&auto=format&fit=crop", description: "Green herb and spinach patties.", options: [{ plate: "180" }], isVeg: true },

    // CHINESE (5 items)
    { CategoryName: "Chinese", name: "Hakka Noodles", img: "/images/food/chinese_manchurian.png", description: "Stir-fried noodles with vegetables.", options: [{ half: "120", full: "200" }], isVeg: true },
    { CategoryName: "Chinese", name: "Fried Rice", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop", description: "Fragrant rice with eggs and vegetables.", options: [{ half: "130", full: "220" }], isVeg: true },
    { CategoryName: "Chinese", name: "Chilli Paneer", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop", description: "Paneer tossed in spicy sauce.", options: [{ half: "160", full: "280" }], isVeg: true },
    { CategoryName: "Chinese", name: "Manchurian Gravy", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&auto=format&fit=crop", description: "Vegetable balls in tangy gravy.", options: [{ full: "240" }], isVeg: true },
    { CategoryName: "Chinese", name: "Chow Mein", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop", description: "Crispy noodles with soy sauce.", options: [{ half: "140", full: "240" }], isVeg: true },

    // BURGER (5 items)
    { CategoryName: "Burger", name: "Classic Burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop", description: "Beef patty with lettuce and tomato.", options: [{ single: "150", double: "250" }], isVeg: false },
    { CategoryName: "Burger", name: "Paneer Burger", img: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Marinated paneer with peri-peri mayo.", options: [{ regular: "140" }], isVeg: true },
    { CategoryName: "Burger", name: "Chicken Burger", img: "/images/food/burger_zinger.png", description: "Crispy fried chicken breast.", options: [{ regular: "160" }], isVeg: false },
    { CategoryName: "Burger", name: "Aloo Tikki Burger", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop", description: "Potato patty with mint sauce.", options: [{ regular: "100" }], isVeg: true },
    { CategoryName: "Burger", name: "Cheese Burger", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format&fit=crop", description: "Melted cheese burger delight.", options: [{ regular: "170" }], isVeg: true },

    // PASTA (5 items)
    { CategoryName: "Pasta", name: "Spaghetti Bolognese", img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Pasta in meat sauce with parmesan.", options: [{ half: "180", full: "320" }], isVeg: false },
    { CategoryName: "Pasta", name: "Fettuccine Alfredo", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&auto=format&fit=crop", description: "Creamy white sauce pasta.", options: [{ half: "160", full: "300" }], isVeg: true },
    { CategoryName: "Pasta", name: "Penne Arrabbiata", img: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Spicy tomato and garlic pasta.", options: [{ full: "280" }], isVeg: true },
    { CategoryName: "Pasta", name: "Mac and Cheese", img: "https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Creamy cheese mac pasta.", options: [{ full: "260" }], isVeg: true },
    { CategoryName: "Pasta", name: "Seafood Pasta", img: "https://images.pexels.com/photos/3298688/pexels-photo-3298688.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Shrimp and clams in garlic sauce.", options: [{ full: "380" }], isVeg: false },

    // SOUTH INDIAN (5 items)
    { CategoryName: "South Indian", name: "Masala Dosa", img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500&auto=format&fit=crop", description: "Crispy crepe with potato filling.", options: [{ regular: "120" }], isVeg: true },
    { CategoryName: "South Indian", name: "Idli Sambar", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop", description: "Steamed rice cakes with lentil soup.", options: [{ plate: "100" }], isVeg: true },
    { CategoryName: "South Indian", name: "Vada", img: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Fried lentil donuts.", options: [{ regular: "90" }], isVeg: true },
    { CategoryName: "South Indian", name: "Uttapam", img: "/images/food/south_indian_dosa.png", description: "Thick savory pancake with toppings.", options: [{ regular: "130" }], isVeg: true },
    { CategoryName: "South Indian", name: "Appam", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop", description: "Rice pancakes with coconut stew.", options: [{ portion: "160" }], isVeg: true },

    // NORTH INDIAN (5 items)
    { CategoryName: "North Indian", name: "Butter Chicken", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop", description: "Chicken in creamy tomato gravy.", options: [{ half: "240", full: "420" }], isVeg: false },
    { CategoryName: "North Indian", name: "Paneer Butter Masala", img: "/images/food/pizza_paneer.png", description: "Paneer in rich creamy sauce.", options: [{ half: "200", full: "360" }], isVeg: true },
    { CategoryName: "North Indian", name: "Dal Makhani", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop", description: "Black lentils with cream and butter.", options: [{ half: "150", full: "280" }], isVeg: true },
    { CategoryName: "North Indian", name: "Chole Bhature", img: "/images/food/north_indian_chole_bhature.png", description: "Chickpeas with puffed bread.", options: [{ plate: "140" }], isVeg: true },
    { CategoryName: "North Indian", name: "Rogan Josh", img: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Aromatic lamb curry.", options: [{ half: "280", full: "500" }], isVeg: false },

    // DESSERT (5 items)
    { CategoryName: "Dessert", name: "Gulab Jamun", img: "https://images.pexels.com/photos/7449109/pexels-photo-7449109.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Sweet milk balls in syrup.", options: [{ regular: "80" }], isVeg: true },
    { CategoryName: "Dessert", name: "Rasmalai", img: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500&auto=format&fit=crop", description: "Soft cheese in sweetened milk.", options: [{ plate: "120" }], isVeg: true },
    { CategoryName: "Dessert", name: "Kheer", img: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Rice pudding with nuts.", options: [{ bowl: "100" }], isVeg: true },
    { CategoryName: "Dessert", name: "Ice Cream", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop", description: "Vanilla ice cream scoop.", options: [{ scoop: "60" }], isVeg: true },
    { CategoryName: "Dessert", name: "Brownie", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop", description: "Chocolate brownie with fudge.", options: [{ piece: "120" }], isVeg: true },

    // BEVERAGE (5 items)
    { CategoryName: "Beverage", name: "Masala Chai", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop", description: "Indian spiced tea.", options: [{ cup: "40" }], isVeg: true },
    { CategoryName: "Beverage", name: "Cold Coffee", img: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=500&auto=format&fit=crop", description: "Chilled coffee with ice cream.", options: [{ glass: "120" }], isVeg: true },
    { CategoryName: "Beverage", name: "Mango Lassi", img: "https://images.pexels.com/photos/5946975/pexels-photo-5946975.jpeg?auto=compress&cs=tinysrgb&w=500", description: "Yogurt drink with mango.", options: [{ glass: "100" }], isVeg: true },
    { CategoryName: "Beverage", name: "Fresh Juice", img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&auto=format&fit=crop", description: "Mixed fruit fresh juice.", options: [{ glass: "90" }], isVeg: true },
    { CategoryName: "Beverage", name: "Soft Drink", img: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=500&auto=format&fit=crop", description: "Chilled cola or sprite.", options: [{ bottle: "50" }], isVeg: true }
];

const seedCategories = [
    { CategoryName: "Biryani" },
    { CategoryName: "Pizza" },
    { CategoryName: "Starter" },
    { CategoryName: "Chinese" },
    { CategoryName: "Burger" },
    { CategoryName: "Pasta" },
    { CategoryName: "South Indian" },
    { CategoryName: "North Indian" },
    { CategoryName: "Dessert" },
    { CategoryName: "Beverage" }
];

// Seed database with updated items
const seedDatabase = async (db) => {
    try {
        // Clear and reseed on each startup to ensure data is current
        console.log('🌱 Clearing and reseeding database...');
        await db.collection("food_items").deleteMany({});
        await db.collection("Categories").deleteMany({});
        
        await db.collection("Categories").insertMany(seedCategories);
        await db.collection("food_items").insertMany(seedFoodItems);
        console.log(`✅ Database seeded successfully! Added ${seedFoodItems.length} items and ${seedCategories.length} categories`);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
    }
};

// Modern async/await approach
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ MongoDB Connected Successfully');
        
        const db = mongoose.connection.db;
        
        // Seed database if empty
        await seedDatabase(db);
        
        // Fetch actual data from collections
        const fetched_items = await db.collection("food_items").find({}).toArray();
        const fetched_categories = await db.collection("Categories").find({}).toArray();
        
        if (fetched_items.length === 0) {
            console.log('⚠️  No data found in MongoDB collections');
            return { foodData: [], categoryData: [] };
        }

        console.log(`📦 Fetched ${fetched_items.length} items from MongoDB`);
        return { foodData: fetched_items, categoryData: fetched_categories };
    } catch (err) {
        console.warn('⚠️  MongoDB Connection Failed:', err.message);
        console.warn('   No fallback data available');
        
        // Return empty data when MongoDB is unavailable
        return { foodData: [], categoryData: [] };
    }
};

module.exports = connectDB;
