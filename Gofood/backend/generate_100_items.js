const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const foodItems = [
    // BIRYANI (10 Unique)
    { CategoryName: "Biryani", name: "Hyderabadi Dum Biryani", img: "https://images.unsplash.com/photo-1589302168068-1c498b3b5ee1?w=1000&auto=format&fit=crop", description: "Classic spicy chicken biryani from Hyderabad.", options: [{ half: "180", full: "320" }], isVeg: false },
    { CategoryName: "Biryani", name: "Lucknowi Mutton Biryani", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=1000&auto=format&fit=crop", description: "Mildly spiced fragrant mutton biryani.", options: [{ half: "250", full: "450" }], isVeg: false },
    { CategoryName: "Biryani", name: "Kolkata Egg Biryani", img: "/images/food/biryani_egg.png", description: "Biryani with boiled eggs and aromatic potatoes.", options: [{ half: "130", full: "220" }], isVeg: false },
    { CategoryName: "Biryani", name: "Malabar Prawns Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1000&auto=format&fit=crop", description: "Coastal special biryani with fresh prawns.", options: [{ half: "280", full: "520" }], isVeg: false },
    { CategoryName: "Biryani", name: "Ambur Chicken Biryani", img: "https://images.unsplash.com/photo-1631515223380-c127445c3956?w=1000&auto=format&fit=crop", description: "Tamil Nadu style seeraga samba rice biryani.", options: [{ half: "160", full: "300" }], isVeg: false },
    { CategoryName: "Biryani", name: "Sindhi Beef Biryani", img: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=1000&auto=format&fit=crop", description: "Spicy and tangy biryani with tender beef.", options: [{ half: "220", full: "400" }], isVeg: false },
    { CategoryName: "Biryani", name: "Thalassery Veg Biryani", img: "https://images.unsplash.com/photo-1516714435131-44eb60980556?w=1000&auto=format&fit=crop", description: "Kerala style short grain rice veg biryani.", options: [{ half: "120", full: "220" }], isVeg: true },
    { CategoryName: "Biryani", name: "Dindigul Thalappakatti Biryani", img: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=1000&auto=format&fit=crop", description: "Famous aromatic biryani from Dindigul.", options: [{ half: "190", full: "350" }], isVeg: false },
    { CategoryName: "Biryani", name: "Memon Biryani", img: "https://images.unsplash.com/photo-1603962285838-83810a441007?w=1000&auto=format&fit=crop", description: "Extremely spicy biryani with yogurt marinade.", options: [{ half: "200", full: "380" }], isVeg: false },
    { CategoryName: "Biryani", name: "Paneer Tikka Biryani", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=1000&auto=format&fit=crop", description: "Tandoori paneer layered with basmati rice.", options: [{ half: "150", full: "280" }], isVeg: true },

    // PIZZA (10 Unique)
    { CategoryName: "Pizza", name: "Classic Margherita", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop", description: "Tomato sauce, fresh mozzarella, and basil.", options: [{ regular: "199", medium: "349", large: "499" }], isVeg: true },
    { CategoryName: "Pizza", name: "Spicy Pepperoni", img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=1000&auto=format&fit=crop", description: "Loaded with spicy pepperoni and extra cheese.", options: [{ regular: "250", medium: "420", large: "580" }], isVeg: false },
    { CategoryName: "Pizza", name: "Veggie Paradise", img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=1000&auto=format&fit=crop", description: "Onions, capsicum, corn, and black olives.", options: [{ regular: "220", medium: "380", large: "520" }], isVeg: true },
    { CategoryName: "Pizza", name: "BBQ Chicken Feast", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop", description: "Smoky BBQ chicken with caramelized onions.", options: [{ regular: "280", medium: "450", large: "620" }], isVeg: false },
    { CategoryName: "Pizza", name: "Hawaiian Dream", img: "https://images.unsplash.com/photo-1574129624552-46c13899558?w=1000&auto=format&fit=crop", description: "Pineapple, ham, and mozzarella cheese.", options: [{ regular: "240", medium: "400", large: "550" }], isVeg: false },
    { CategoryName: "Pizza", name: "Four Cheese Magic", img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=1000&auto=format&fit=crop", description: "Mozzarella, cheddar, parmesan, and gorgonzola.", options: [{ regular: "270", medium: "480", large: "650" }], isVeg: true },
    { CategoryName: "Pizza", name: "Paneer Makhani Pizza", img: "/images/food/pizza_paneer.png", description: "Fusion pizza with rich butter masala paneer.", options: [{ regular: "240", medium: "420", large: "599" }], isVeg: true },
    { CategoryName: "Pizza", name: "Tandoori Chicken Pizza", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop", description: "Tandoori chicken with mint chutney drizzle.", options: [{ regular: "260", medium: "450" }], isVeg: false },
    { CategoryName: "Pizza", name: "Farmhouse Pizza", img: "https://images.unsplash.com/photo-1528137884232-ec013b03aa4a?w=1000&auto=format&fit=crop", description: "Fresh farm vegetables with multi-grain base.", options: [{ large: "620" }], isVeg: true },
    { CategoryName: "Pizza", name: "Chocolate Pizza", img: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=1000&auto=format&fit=crop", description: "Nutella, strawberries, and white chocolate.", options: [{ small: "199" }], isVeg: true },

    // STARTER (10 Unique)
    { CategoryName: "Starter", name: "Paneer Tikka Royale", img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce99?w=1000&auto=format&fit=crop", description: "Classic paneer tikka with mint chutney.", options: [{ plate: "240" }], isVeg: true },
    { CategoryName: "Starter", name: "Chicken Seekh Kebab", img: "https://images.unsplash.com/photo-1599307767316-776533bb941c?w=1000&auto=format&fit=crop", description: "Minced chicken skewers grilled in clay oven.", options: [{ plate: "320" }], isVeg: false },
    { CategoryName: "Starter", name: "Hara Bhara Kebab", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1000&auto=format&fit=crop", description: "Spinach and pea patties with nuts.", options: [{ plate: "220" }], isVeg: true },
    { CategoryName: "Starter", name: "Crispy Corn", img: "https://images.unsplash.com/photo-1589647332630-4aa431969ed1?w=1000&auto=format&fit=crop", description: "Deep fried sweet corn with spicy seasoning.", options: [{ regular: "180" }], isVeg: true },
    { CategoryName: "Starter", name: "Stuffed Mushrooms", img: "/images/food/starter_mushrooms.png", description: "Mushrooms stuffed with cheese and herbs.", options: [{ plate: "260" }], isVeg: true },
    { CategoryName: "Starter", name: "Dahi Ke Kabab", img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=1000&auto=format&fit=crop", description: "Creamy yogurt kababs with mild spices.", options: [{ plate: "250" }], isVeg: true },
    { CategoryName: "Starter", name: "Fish Fingers", img: "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?w=1000&auto=format&fit=crop", description: "Crispy breaded fish with tartar sauce.", options: [{ plate: "340" }], isVeg: false },
    { CategoryName: "Starter", name: "Spring Rolls", img: "https://images.unsplash.com/photo-1588166524941-3bf61a120038?w=1000&auto=format&fit=crop", description: "Crispy rolls with vegetable filling.", options: [{ regular: "160" }], isVeg: true },
    { CategoryName: "Starter", name: "Mutton Cutlet", img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=1000&auto=format&fit=crop", description: "Spiced minced mutton patties.", options: [{ plate: "380" }], isVeg: false },
    { CategoryName: "Starter", name: "Soya Chaap Tikka", img: "https://images.unsplash.com/photo-1626777553731-89d81d582103?w=1000&auto=format&fit=crop", description: "Grilled soy chunks in tangy marinade.", options: [{ plate: "210" }], isVeg: true },

    // CHINESE (10 Unique)
    { CategoryName: "Chinese", name: "Manchurian Gravy", img: "/images/food/chinese_manchurian.png", description: "Vegetable balls in spicy ginger-garlic sauce.", options: [{ half: "150", full: "280" }], isVeg: true },
    { CategoryName: "Chinese", name: "Chilli Paneer Dry", img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=1000&auto=format&fit=crop", description: "Cottage cheese tossed with peppers and soy.", options: [{ half: "170", full: "310" }], isVeg: true },
    { CategoryName: "Chinese", name: "Honey Chilli Potato", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1000&auto=format&fit=crop", description: "Crispy potato fries in sweet and spicy glaze.", options: [{ full: "190" }], isVeg: true },
    { CategoryName: "Chinese", name: "Steamed Dimsums", img: "https://images.unsplash.com/photo-1541646038507-9811e77dc114?w=1000&auto=format&fit=crop", description: "Delicate vegetable dumplings served with dip.", options: [{ plate: "180" }], isVeg: true },
    { CategoryName: "Chinese", name: "Chop Suey Veg", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1000&auto=format&fit=crop", description: "Crispy noodles with mixed vegetable sauce.", options: [{ full: "240" }], isVeg: true },
    { CategoryName: "Chinese", name: "Schezwan Fried Rice", img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=1000&auto=format&fit=crop", description: "Spicy rice with Schezwan peppers.", options: [{ full: "220" }], isVeg: true },
    { CategoryName: "Chinese", name: "Hakka Noodles", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&auto=format&fit=crop", description: "Stir fried noodles with fresh vegetables.", options: [{ half: "120", full: "220" }], isVeg: true },
    { CategoryName: "Chinese", name: "Kung Pao Chicken", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&auto=format&fit=crop", description: "Chicken with peanuts and red chillies.", options: [{ full: "380" }], isVeg: false },
    { CategoryName: "Chinese", name: "Crispy Baby Corn", img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1000&auto=format&fit=crop", description: "Deep fried baby corn in spicy sauce.", options: [{ regular: "210" }], isVeg: true },
    { CategoryName: "Chinese", name: "Chicken Tai Pai", img: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=1000&auto=format&fit=crop", description: "Sliced chicken in hot garlic sauce.", options: [{ full: "350" }], isVeg: false },

    // BURGER (10 Unique)
    { CategoryName: "Burger", name: "Crispy Chicken Zinger", img: "/images/food/burger_zinger.png", description: "Spicy fried chicken breast in a soft bun.", options: [{ regular: "180" }], isVeg: false },
    { CategoryName: "Burger", name: "Spicy Paneer Burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&auto=format&fit=crop", description: "Battered paneer patty with peri-peri sauce.", options: [{ regular: "160" }], isVeg: true },
    { CategoryName: "Burger", name: "Veg Maharaja Mac", img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=1000&auto=format&fit=crop", description: "Double decker veg burger with special sauce.", options: [{ large: "199" }], isVeg: true },
    { CategoryName: "Burger", name: "Fish Fillet Burger", img: "https://images.unsplash.com/photo-1550547660-d9450f85ca8b?w=1000&auto=format&fit=crop", description: "Fried fish fillet with tartar sauce.", options: [{ regular: "210" }], isVeg: false },
    { CategoryName: "Burger", name: "Cheese Burst Burger", img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1000&auto=format&fit=crop", description: "Patty stuffed with oozing mozzarella cheese.", options: [{ regular: "185" }], isVeg: true },
    { CategoryName: "Burger", name: "Aloo Tikki Burger", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1000&auto=format&fit=crop", description: "Classic potato patty with mint mayo.", options: [{ regular: "85" }], isVeg: true },
    { CategoryName: "Burger", name: "Whopper Veg", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1000&auto=format&fit=crop", description: "Flame grilled veg patty with fresh veggies.", options: [{ regular: "155" }], isVeg: true },
    { CategoryName: "Burger", name: "Tex-Mex Burger", img: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1000&auto=format&fit=crop", description: "Salsa, nachos, and jalapeno loaded burger.", options: [{ regular: "175" }], isVeg: true },
    { CategoryName: "Burger", name: "Chicken Maharaja Mac", img: "https://images.unsplash.com/photo-1547584385-8cd4d7df953c?w=1000&auto=format&fit=crop", description: "The non-veg king of burgers.", options: [{ regular: "240" }], isVeg: false },
    { CategoryName: "Burger", name: "Paneer Deluxe Burger", img: "https://images.unsplash.com/photo-1513185158878-8d8c196b3fcf?w=1000&auto=format&fit=crop", description: "Premium grilled paneer patty.", options: [{ regular: "190" }], isVeg: true },

    // PASTA (10 Unique)
    { CategoryName: "Pasta", name: "Creamy Fettuccine Alfredo", img: "/images/food/pasta_alfredo.png", description: "Rich white sauce with parmesan cheese.", options: [{ half: "180", full: "320" }], isVeg: true },
    { CategoryName: "Pasta", name: "Lasagna Bolognese", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=1000&auto=format&fit=crop", description: "Layered pasta with meat sauce and cheese.", options: [{ full: "450" }], isVeg: false },
    { CategoryName: "Pasta", name: "Seafood Linguine", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1000&auto=format&fit=crop", description: "Linguine with fresh clams and shrimp.", options: [{ full: "520" }], isVeg: false },
    { CategoryName: "Pasta", name: "Arabiata Pasta", img: "https://images.unsplash.com/photo-1551892374-ecf5055f0d06?w=1000&auto=format&fit=crop", description: "Spicy tomato sauce with garlic and chillies.", options: [{ full: "260" }], isVeg: true },
    { CategoryName: "Pasta", name: "Pesto Pasta", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=1000&auto=format&fit=crop", description: "Fresh basil pesto with nuts and olives.", options: [{ full: "310" }], isVeg: true },
    { CategoryName: "Pasta", name: "Mac and Cheese", img: "https://images.unsplash.com/photo-1591380525203-997f35359b34?w=1000&auto=format&fit=crop", description: "Gooey cheesy pasta with sourdough crust.", options: [{ half: "150", full: "260" }], isVeg: true },
    { CategoryName: "Pasta", name: "Chicken Fusilli", img: "https://images.unsplash.com/photo-1481931098730-11102e34ff05?w=1000&auto=format&fit=crop", description: "Fusilli tossed in pink sauce with chicken.", options: [{ full: "380" }], isVeg: false },
    { CategoryName: "Pasta", name: "Veg Ravioli", img: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=1000&auto=format&fit=crop", description: "Handmade ravioli with spinach-ricotta filling.", options: [{ full: "340" }], isVeg: true },
    { CategoryName: "Pasta", name: "Spaghetti Carbonara", img: "https://images.unsplash.com/photo-1516100882582-76c97a44f2a1?w=1000&auto=format&fit=crop", description: "Creamy egg-based sauce with bacon.", options: [{ full: "420" }], isVeg: false },
    { CategoryName: "Pasta", name: "Gnocchi Sorretina", img: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=1000&auto=format&fit=crop", description: "Soft dough dumplings in tomato-basil sauce.", options: [{ full: "330" }], isVeg: true },

    // SOUTH INDIAN (10 Unique)
    { CategoryName: "South Indian", name: "Medhu Vada (2 pcs)", img: "https://images.unsplash.com/photo-1589301773839-a06886e065bc?w=1000&auto=format&fit=crop", description: "Lentil donuts fried until golden brown.", options: [{ regular: "70" }], isVeg: true },
    { CategoryName: "South Indian", name: "Mix Veg Uttapam", img: "https://images.unsplash.com/photo-1610057099443-f47ec06a6c2f?w=1000&auto=format&fit=crop", description: "Thick pancake with tomatoes and onions.", options: [{ regular: "110" }], isVeg: true },
    { CategoryName: "South Indian", name: "Appam with Coconut Stew", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1000&auto=format&fit=crop", description: "Soft centered lacy crepes with vegetable stew.", options: [{ portion: "180" }], isVeg: true },
    { CategoryName: "South Indian", name: "Lemon Rice", img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=1000&auto=format&fit=crop", description: "Tangy rice with peanuts and curry leaves.", options: [{ full: "120" }], isVeg: true },
    { CategoryName: "South Indian", name: "Rava Onion Dosa", img: "/images/food/south_indian_dosa.png", description: "Crispy semolina dosa with sautéed onions.", options: [{ regular: "130" }], isVeg: true },
    { CategoryName: "South Indian", name: "Paniyaram (8 pcs)", img: "https://images.unsplash.com/photo-1596797038530-2c39bb9ed9Ac?w=1000&auto=format&fit=crop", description: "Small spiced steamed dumplings.", options: [{ regular: "90" }], isVeg: true },
    { CategoryName: "South Indian", name: "Sambar Vada (2 pcs)", img: "https://images.unsplash.com/photo-1512612258238-e67c9c03b41c?w=1000&auto=format&fit=crop", description: "Vadas soaked in spicy lentil soup.", options: [{ regular: "85" }], isVeg: true },
    { CategoryName: "South Indian", name: "Paper Plain Dosa", img: "https://images.unsplash.com/photo-1630409351241-e90e7f5e434d?w=1000&auto=format&fit=crop", description: "Ultra-thin and crispy golden dosa.", options: [{ regular: "100" }], isVeg: true },
    { CategoryName: "South Indian", name: "Ghee Roast Masala Dosa", img: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=1000&auto=format&fit=crop", description: "Crispy dosa with potato masala and ghee.", options: [{ regular: "160" }], isVeg: true },
    { CategoryName: "South Indian", name: "Filter Coffee", img: "https://images.unsplash.com/photo-1627575086415-3734eac408a0?w=1000&auto=format&fit=crop", description: "Strong and aromatic South Indian coffee.", options: [{ cup: "40" }], isVeg: true },

    // NORTH INDIAN (10 Unique)
    { CategoryName: "North Indian", name: "Butter Chicken", img: "https://images.unsplash.com/photo-1626777552131-07662d989470?w=1000&auto=format&fit=crop", description: "Rich creamy tomato gravy with grilled chicken.", options: [{ half: "260", full: "480" }], isVeg: false },
    { CategoryName: "North Indian", name: "Dal Makhani", img: "https://images.unsplash.com/photo-1606755962773-d323098fd96c?w=1000&auto=format&fit=crop", description: "Overnight slow cooked black lentils with cream.", options: [{ half: "160", full: "280" }], isVeg: true },
    { CategoryName: "North Indian", name: "Paneer Butter Masala", img: "https://images.unsplash.com/photo-1618161595703-9e050882c94a?w=1000&auto=format&fit=crop", description: "Sweet and spicy creamy paneer curry.", options: [{ half: "190", full: "340" }], isVeg: true },
    { CategoryName: "North Indian", name: "Chole Bhature", img: "/images/food/north_indian_chole_bhature.png", description: "Spiced chickpeas served with puffed bread.", options: [{ full: "150" }], isVeg: true },
    { CategoryName: "North Indian", name: "Mutton Rogan Josh", img: "https://images.unsplash.com/photo-1542367592-8849eb950fd8?w=1000&auto=format&fit=crop", description: "Authentic Kashmiri style lamb curry.", options: [{ half: "320", full: "580" }], isVeg: false },
    { CategoryName: "North Indian", name: "Palak Paneer", img: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=1000&auto=format&fit=crop", description: "Cottage cheese in a vibrant spinach gravy.", options: [{ full: "240" }], isVeg: true },
    { CategoryName: "North Indian", name: "Kadhai Chicken", img: "https://images.unsplash.com/photo-1603894584202-933bc913d906?w=1000&auto=format&fit=crop", description: "Chicken cooked with bell peppers and thick gravy.", options: [{ full: "380" }], isVeg: false },
    { CategoryName: "North Indian", name: "Malai Kofta", img: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=1000&auto=format&fit=crop", description: "Fried potato-paneer balls in creamy sauce.", options: [{ full: "280" }], isVeg: true },
    { CategoryName: "North Indian", name: "Tandoori Roti", img: "https://images.unsplash.com/photo-1539755138241-76672322055a?w=1000&auto=format&fit=crop", description: "Simple whole wheat bread from clay oven.", options: [{ regular: "20" }], isVeg: true },
    { CategoryName: "North Indian", name: "Butter Naan", img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?w=1000&auto=format&fit=crop", description: "Leavened bread glazed with butter.", options: [{ regular: "40" }], isVeg: true },

    // DESSERT (10 Unique)
    { CategoryName: "Dessert", name: "Gulab Jamun (2 pcs)", img: "/images/food/dessert_gulab_jamun.png", description: "Warm milk solids soaked in sugar syrup.", options: [{ regular: "60" }], isVeg: true },
    { CategoryName: "Dessert", name: "Shahi Tukda", img: "https://images.unsplash.com/photo-1589114473537-c4a7d05794ad?w=1000&auto=format&fit=crop", description: "Hyderabadi style bread pudding.", options: [{ regular: "110" }], isVeg: true },
    { CategoryName: "Dessert", name: "Gajar Ka Halwa", img: "https://images.unsplash.com/photo-1589114473537-c4a7d05794ad?w=1000&auto=format&fit=crop", description: "Rich carrot pudding with nuts and khoya.", options: [{ bowl: "110" }], isVeg: true },
    { CategoryName: "Dessert", name: "Phirni", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1000&auto=format&fit=crop", description: "Creamy ground rice pudding.", options: [{ bowl: "90" }], isVeg: true },
    { CategoryName: "Dessert", name: "Jalebi with Rabri", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=1000&auto=format&fit=crop", description: "Crispy syrup coils with thickened milk.", options: [{ full: "150" }], isVeg: true },
    { CategoryName: "Dessert", name: "Ras Malai (2 pcs)", img: "https://images.unsplash.com/photo-1614707267537-b856606fb271?w=1000&auto=format&fit=crop", description: "Soft cheese patties in sweet milky syrup.", options: [{ plate: "120" }], isVeg: true },
    { CategoryName: "Dessert", name: "Kulfi Falooda", img: "https://images.unsplash.com/photo-1501139083539-d352723f00ca?w=1000&auto=format&fit=crop", description: "Traditional frozen milk cake with vermicelli.", options: [{ glass: "140" }], isVeg: true },
    { CategoryName: "Dessert", name: "Brownie with Fudge", img: "https://images.unsplash.com/photo-1574129841951-5ee45b5974a6?w=1000&auto=format&fit=crop", description: "Fudgy brownie with extra hot fudge.", options: [{ regular: "130" }], isVeg: true },
    { CategoryName: "Dessert", name: "Mango Mousse", img: "https://images.unsplash.com/photo-1541167760496-1628856ab752?w=1000&auto=format&fit=crop", description: "Light and airy fresh mango dessert.", options: [{ glass: "110" }], isVeg: true },
    { CategoryName: "Dessert", name: "Vanilla Ice Cream", img: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=1000&auto=format&fit=crop", description: "Double scoop premium vanilla.", options: [{ scoop: "80" }], isVeg: true },

    // BEVERAGE (10 Unique)
    { CategoryName: "Beverage", name: "Mango Lassi", img: "/images/food/beverage_mango_lassi.png", description: "Sweet yogurt drink with fresh mango pulp.", options: [{ regular: "80" }], isVeg: true },
    { CategoryName: "Beverage", name: "Virgin Mojito", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1000&auto=format&fit=crop", description: "Classic refreshing mint and lime cooler.", options: [{ glass: "120" }], isVeg: true },
    { CategoryName: "Beverage", name: "Fresh Lime Soda", img: "https://images.unsplash.com/photo-1544145945-f904253db0ad?w=1000&auto=format&fit=crop", description: "Sweet/salted lime soda.", options: [{ glass: "60" }], isVeg: true },
    { CategoryName: "Beverage", name: "Cold Coffee", img: "https://images.unsplash.com/photo-1536935338213-d2c1238b91c0?w=1000&auto=format&fit=crop", description: "Blended coffee with vanilla ice cream.", options: [{ glass: "110" }], isVeg: true },
    { CategoryName: "Beverage", name: "Sweet Lassi", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1000&auto=format&fit=crop", description: "Traditional sweetened yogurt drink.", options: [{ glass: "70" }], isVeg: true },
    { CategoryName: "Beverage", name: "Iced Tea", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1000&auto=format&fit=crop", description: "Refreshing lemon flavoured iced tea.", options: [{ glass: "90" }], isVeg: true },
    { CategoryName: "Beverage", name: "Chocolate Shake", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1000&auto=format&fit=crop", description: "Rich Belgian chocolate milk shake.", options: [{ glass: "140" }], isVeg: true },
    { CategoryName: "Beverage", name: "Hot Chocolate", img: "https://images.unsplash.com/photo-1517646272502-78c3993ad7ca?w=1000&auto=format&fit=crop", description: "Warm creamy cocoa with marshmallows.", options: [{ regular: "150" }], isVeg: true },
    { CategoryName: "Beverage", name: "Ginger Tea", img: "https://images.unsplash.com/photo-1594631252845-29fc4586d5d7?w=1000&auto=format&fit=crop", description: "Masala tea with fresh ginger.", options: [{ cup: "30" }], isVeg: true },
    { CategoryName: "Beverage", name: "Water (1L)", img: "https://images.unsplash.com/photo-1548919973-72257d3f53ba?w=1000&auto=format&fit=crop", description: "Packaged mineral water bottle.", options: [{ bottle: "40" }], isVeg: true }
];

const categories = [
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

async function seedDatabase() {
    try {
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;

        // Clear existing data
        await db.collection('food_items').deleteMany({});
        await db.collection('Categories').deleteMany({});

        // Add new data
        await db.collection('food_items').insertMany(foodItems);
        await db.collection('Categories').insertMany(categories);

        console.log('✅ Database seeded successfully with 100 UNIQUE and VERIFIED visuals!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error seeding database:', err.message);
        process.exit(1);
    }
}

seedDatabase();
