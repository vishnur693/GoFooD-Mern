const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://GofooD:gofood123@cluster0.r5j4dym.mongodb.net/gofood?retryWrites=true&w=majority';

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected');

        const foodItemsCollection = connection.connection.db.collection('food_items');
        const fetchedData = await foodItemsCollection.find({}).toArray();
        const foodCategoryCollection = connection.connection.db.collection('foodCategory'); // Fix: Use connection instead of mongoose.connection
        const foodCategory = await foodCategoryCollection.find({}).toArray(); // Fix: Use foodCategoryCollection

        if (fetchedData.length > 0) {
            global.food_items = fetchedData;
            // console.log(global.food_items);
        } else {
            console.log('No data found in the food_items collection.');
        }

        if (foodCategory.length > 0) {
            global.foodCategory=foodCategory;
            // console.log(global.foodCategory);
        } else {
            console.log('No data found in the foodCategory collection.');
        }
    } catch (error) {
        console.error('Connection error:', error.message);
    }
};

module.exports = connectToDatabase;
