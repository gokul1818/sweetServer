const cron = require('node-cron');
const Carousel = require('../models/carousel'); // Adjust the path as necessary

function start() {
    console.log('Scheduler starting...');
    cron.schedule('*/5 * * * *', async () => {  // Runs every 5 minutes
      console.log('Cron job running...');
      try {
        const now = new Date();
        console.log('Current date:', now);
        const result = await Carousel.deleteMany({ 'image.expiry': { $lt: now } });
        console.log(`Deleted ${result.deletedCount} expired carousels`);
      } catch (error) {
        console.error('Error deleting expired carousels:', error);
      }
    });
  }
  

module.exports = { start };
