const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gofood';

// Mock fallback data for development when MongoDB is unavailable
const mockFoodData = [
    // BIRYANI (1-5)
    { _id: "b1", CategoryName: "Biryani", name: "Hyderabadi Chicken Biryani", img: "/chicken_biryani.png", options: [{ half: "180", full: "320" }], description: "Authentic dum biryani with marinated chicken and long-grain basmati rice." },
    { _id: "b2", CategoryName: "Biryani", name: "Lucknowi Mutton Biryani", img: "https://images.unsplash.com/photo-1589302168068-1c49826d5df6?w=500&auto=format", options: [{ half: "250", full: "450" }], description: "Aromatic Awadhi biryani with tender mutton pieces." },
    { _id: "b3", CategoryName: "Biryani", name: "Veg Lucknawi Biryani", img: "/veg_biryani.png", options: [{ half: "140", full: "240" }], description: "Fragrant vegetable biryani cooked with subtle spices." },
    { _id: "b4", CategoryName: "Biryani", name: "Egg Dum Biryani", img: "https://images.unsplash.com/photo-1543332164-6e82f355bab1?w=500&auto=format", options: [{ half: "130", full: "220" }], description: "Traditional egg biryani with spiced boiled eggs." },
    { _id: "b5", CategoryName: "Biryani", name: "Prawns Masala Biryani", img: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=500&auto=format", options: [{ half: "280", full: "520" }], description: "Spicy coastal biryani with fresh prawns and coastal spices." },

    // PIZZA (6-10)
    { _id: "p1", CategoryName: "Pizza", name: "Margherita Supreme", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format", options: [{ regular: "199", medium: "349", large: "499" }], description: "Double cheese margherita with fresh basil leaves." },
    { _id: "p2", CategoryName: "Pizza", name: "Pepperoni Passion", img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format", options: [{ regular: "250", medium: "420", large: "580" }], description: "Loaded with extra mozzarella and spicy pepperoni slices." },
    { _id: "p3", CategoryName: "Pizza", name: "Veggies Fest", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format", options: [{ regular: "180", medium: "320", large: "450" }], description: "Corn, capsicum, onion, and black olives." },
    { _id: "p4", CategoryName: "Pizza", name: "BBQ Chicken Feast", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format", options: [{ regular: "280", medium: "480", large: "650" }], description: "Smoky BBQ sauce with grilled chicken and jalapenos." },
    { _id: "p5", CategoryName: "Pizza", name: "Farmhouse Deluxe", img: "https://images.unsplash.com/photo-1574129656617-81730bb9ac1a?w=500&auto=format", options: [{ regular: "220", medium: "390", large: "550" }], description: "Mushrooms, onions, tomatoes, and golden corn." },

    // STARTER (11-15)
    { _id: "s1", CategoryName: "Starter", name: "Chicken Wings (Hot)", img: "/chicken_wings.png", options: [{ half: "150", full: "280" }], description: "Crispy wings tossed in buffalo hot sauce." },
    { _id: "s2", CategoryName: "Starter", name: "Paneer Tikka Grill", img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format", options: [{ half: "120", full: "220" }], description: "Clay-oven grilled paneer cubes with mint chutney." },
    { _id: "s3", CategoryName: "Starter", name: "Veg Spring Rolls", img: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=500&auto=format", options: [{ "4 Pcs": "99", "8 Pcs": "180" }], description: "Crispy rolls stuffed with seasoned vegetables." },
    { _id: "s4", CategoryName: "Starter", name: "Gobi Manchurian", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&auto=format", options: [{ half: "110", full: "190" }], description: "Indo-chinese cauliflower fritters in spicy gravy." },
    { _id: "s5", CategoryName: "Starter", name: "Fish Finger Fry", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format", options: [{ half: "180", full: "340" }], description: "Breaded fish fingers served with tartar sauce." },

    // BURGERS (16-20)
    { _id: "bu1", CategoryName: "Burgers", name: "Royal Cheese Burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format", options: [{ single: "149", double: "249" }], description: "Quarter pounder with cheddar and pickles." },
    { _id: "bu2", CategoryName: "Burgers", name: "Spicy Zinger", img: "https://images.unsplash.com/photo-1513185158878-8d8c182b013f?w=500&auto=format", options: [{ regular: "160", large: "260" }], description: "Crispy chicken breast with thousand island sauce." },
    { _id: "bu3", CategoryName: "Burgers", name: "Alooo Tikki Special", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format", options: [{ regular: "89", jumbo: "149" }], description: "Classic Indian potato patty burger." },
    { _id: "bu4", CategoryName: "Burgers", name: "Paneer King", img: "https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1?w=500&auto=format", options: [{ regular: "180", jumbo: "280" }], description: "Crispy paneer patty with peri-peri mayo." },
    { _id: "bu5", CategoryName: "Burgers", name: "Mushroom Swiss", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format", options: [{ regular: "210", double: "320" }], description: "Beef patty with sautéed mushrooms and swiss cheese." },

    // CHINESE (21-25)
    { _id: "ch1", CategoryName: "Chinese", name: "Veg Hakka Noodles", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format", options: [{ half: "110", full: "190" }], description: "Stir-fried noodles with crisp vegetables." },
    { _id: "ch2", CategoryName: "Chinese", name: "Chicken Fried Rice", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format", options: [{ half: "140", full: "240" }], description: "Classic dashi rice with scrambled eggs and chicken." },
    { _id: "ch3", CategoryName: "Chinese", name: "Chilli Paneer Dry", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format", options: [{ half: "160", full: "280" }], description: "Cottage cheese cubes in spicy soya garlic sauce." },
    { _id: "ch4", CategoryName: "Chinese", name: "Momos Steam (8 pcs)", img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b4?w=500&auto=format", options: [{ veg: "99", chicken: "149" }], description: "Steamed dumplings served with spicy garlic chutney." },
    { _id: "ch5", CategoryName: "Chinese", name: "Manchow Soup", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format", options: [{ half: "60", full: "110" }], description: "Thick spicy soup with crunchy noodles." },

    // MAIN COURSE (26-30)
    { _id: "mc1", CategoryName: "Main Course", name: "Butter Chicken", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format", options: [{ half: "240", full: "420" }], description: "Tandoori chicken in creamy tomato gravy." },
    { _id: "mc2", CategoryName: "Main Course", name: "Paneer Butter Masala", img: "https://images.unsplash.com/photo-1631452139118-a25e19754964?w=500&auto=format", options: [{ half: "180", full: "340" }], description: "Rich and creamy paneer preparation." },
    { _id: "mc3", CategoryName: "Main Course", name: "Dal Makhani", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format", options: [{ half: "140", full: "260" }], description: "Overnight slow-cooked black lentils with cream." },
    { _id: "mc4", CategoryName: "Main Course", name: "Mutton Rogan Josh", img: "https://images.unsplash.com/photo-1544378129-c48421ff243b?w=500&auto=format", options: [{ half: "320", full: "580" }], description: "Traditional Kashmiri style mutton curry." },
    { _id: "mc5", CategoryName: "Main Course", name: "Kadai Veg", img: "https://images.unsplash.com/photo-1631233866312-5b4c23c7659e?w=500&auto=format", options: [{ half: "150", full: "280" }], description: "Mixed vegetables cooked in a spicy kadai masala." },

    // BEVERAGES (31-35)
    { _id: "bv1", CategoryName: "Beverages", name: "Masala Chai", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format", options: [{ single: "20", pot: "70" }], description: "Authentic Indian tea with cardamon and ginger." },
    { _id: "bv2", CategoryName: "Beverages", name: "Cold Coffee", img: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=500&auto=format", options: [{ regular: "80", with_ice_cream: "120" }], description: "Refreshing whipped cold coffee." },
    { _id: "bv3", CategoryName: "Beverages", name: "Mango Lassi", img: "https://images.unsplash.com/photo-1571006682855-38890db0be1a?w=500&auto=format", options: [{ small: "60", large: "110" }], description: "Sweet yogurt drink with alphonso mango." },
    { _id: "bv4", CategoryName: "Beverages", name: "Virgin Mojito", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format", options: [{ glass: "99" }], description: "Classic mint and lime refresher." },
    { _id: "bv5", CategoryName: "Beverages", name: "Oreo Shake", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format", options: [{ full: "140" }], description: "Rich shake with crushed Oreo cookies." },

    // DESSERT (36-40)
    { _id: "d1", CategoryName: "Dessert", name: "Gulab Jamun (2 pcs)", img: "https://images.unsplash.com/photo-1589119634719-f5592888bd4a?w=500&auto=format", options: [{ regular: "60" }], description: "Warm dumplings in sugary rose syrup." },
    { _id: "d2", CategoryName: "Dessert", name: "Choco Hot Brownie", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format", options: [{ plain: "120", with_fudge: "160" }], description: "Rich chocolate brownie served warm." },
    { _id: "d3", CategoryName: "Dessert", name: "Rasmalai (2 pcs)", img: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=500&auto=format", options: [{ cold: "90" }], description: "Soft cottage cheese patties in saffron milk." },
    { _id: "d4", CategoryName: "Dessert", name: "Vanilla Ice Cream", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format", options: [{ scoop: "50", family_pack: "220" }], description: "Classic Madagascar vanilla bean ice cream." },
    { _id: "d5", CategoryName: "Dessert", name: "Tiramisu Slice", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format", options: [{ single: "180" }], description: "Coffee-flavored Italian dessert." },

    // SOUTH INDIAN (41-45)
    { _id: "si1", CategoryName: "South Indian", name: "Masala Dosa", img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500", options: [{ plain: "80", butter: "110" }], description: "Crispy rice crepe with potato filling." },
    { _id: "si2", CategoryName: "South Indian", name: "Idli Sambar (2 pcs)", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500", options: [{ regular: "60" }], description: "Steamed rice cakes served with sambar." },
    { _id: "si3", CategoryName: "South Indian", name: "Vada (2 pcs)", img: "https://images.unsplash.com/photo-1601050690597-df056fb6979a?w=500", options: [{ crispy: "70" }], description: "Savory fried donuts with chutney." },
    { _id: "si4", CategoryName: "South Indian", name: "Uttapam Mix Veg", img: "https://images.unsplash.com/photo-1589301773832-de09f6eeb095?w=500", options: [{ regular: "120" }], description: "Thick savory pancake topped with veggies." },
    { _id: "si5", CategoryName: "South Indian", name: "Appam with Stew", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500", options: [{ portion: "160" }], description: "Lacy rice pancakes with coconut milk stew." },

    // ROLLS & SANDWICHES (46-50)
    { _id: "rs1", CategoryName: "Rolls", name: "Chicken Kati Roll", img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500", options: [{ single: "120", double: "190" }], description: "Spiced chicken kebabs wrapped in paratha." },
    { _id: "rs2", CategoryName: "Rolls", name: "Paneer Tikka Roll", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", options: [{ single: "110", double: "180" }], description: "Marinated paneer grilled and rolled." },
    { _id: "rs3", CategoryName: "Rolls", name: "Veg Club Sandwich", img: "https://images.unsplash.com/photo-1538220856186-0be0c085984d?w=500", options: [{ normal: "99", grilled: "129" }], description: "Triple layered sandwich with coleslaw and veggies." },
    { _id: "rs4", CategoryName: "Rolls", name: "Chicken Mayo Sub", img: "https://images.unsplash.com/photo-1521390188846-e2a3a9745300?w=500", options: [{ "6 inch": "180", "12 inch": "340" }], description: "Shredded chicken in creamy mayo with lettuce." },
    { _id: "rs5", CategoryName: "Rolls", name: "Egg Mayo Roll", img: "https://images.unsplash.com/photo-1606342898929-e885d5fbe905?w=500", options: [{ single: "90", double: "150" }], description: "Boiled egg roll with creamy salad." }
];

const mockCategoryData = [
    { _id: "c1", CategoryName: "Starter" },
    { _id: "c2", CategoryName: "Biryani" },
    { _id: "c3", CategoryName: "Pizza" },
    { _id: "c4", CategoryName: "Burgers" },
    { _id: "c5", CategoryName: "Chinese" },
    { _id: "c6", CategoryName: "Main Course" },
    { _id: "c7", CategoryName: "Beverages" },
    { _id: "c8", CategoryName: "Dessert" },
    { _id: "c9", CategoryName: "South Indian" },
    { _id: "c10", CategoryName: "Rolls" }
];

// Modern async/await approach
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ MongoDB Connected Successfully');
        
        const db = mongoose.connection.db;
        
        // Fetch actual data from collections
        const fetched_items = await db.collection("food_items").find({}).toArray();
        const fetched_categories = await db.collection("Categories").find({}).toArray();
        
        if (fetched_items.length === 0) {
            console.log('⚠️  No data found in MongoDB collections, using mock data');
            return { foodData: mockFoodData, categoryData: mockCategoryData };
        }

        console.log(`📦 Fetched ${fetched_items.length} items from MongoDB`);
        return { foodData: fetched_items, categoryData: fetched_categories };
    } catch (err) {
        console.warn('⚠️  MongoDB Connection Failed:', err.message);
        console.warn('   Using mock/fallback data for development');
        
        // Return mock data to allow server to start
        return { foodData: mockFoodData, categoryData: mockCategoryData };
    }
};

module.exports = connectDB;
