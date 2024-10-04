const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateUniqueId } = require('../utils/createId');

const filesSchema = new Schema({
    id: {
        type: String,
        unique: true,   // Ensure id is unique
    },
    name: { type: String, required: true },
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
}, { timestamps: true });

filesSchema.pre('save', async function (next) {
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

const FileUpload = mongoose.model('FIles', filesSchema);

module.exports = FileUpload;
