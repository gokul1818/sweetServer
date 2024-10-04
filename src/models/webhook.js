const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateUniqueId } = require('../utils/createId');

const webhookSchema = new Schema({
    id: {
        type: String,
        unique: true,   // Ensure id is unique
    },
    event: {
        type: String,
        required: true, // Make event required
    },
    payload: {
        type: Object,
        required: true, // Make payload required
    },
    source: {
        type: String,
        required: true, // Make source required
    }
}, { timestamps: true });

webhookSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const nextId = generateUniqueId();
            this.id = nextId;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Webhook = mongoose.model('Webhook', webhookSchema);

module.exports = Webhook;
