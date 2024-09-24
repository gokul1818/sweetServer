require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { CategoriesList } = require('../models/categories'); // Adjust the import as needed

async function importData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Read JSON file
        const filePath = path.join(__dirname, '../helper/categoriesList.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const categoriesListData = JSON.parse(jsonData);

        // Clear existing data (optional)
        await CategoriesList.deleteMany();

        // Import new data into MongoDB
        const result = await CategoriesList.insertMany(categoriesListData);
        console.log(`Inserted ${result.length} categories into categoriesList collection`);
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        await mongoose.connection.close();
    }
}

module.exports = importData;
