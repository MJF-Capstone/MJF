const { mongoose } = require('../db');

const Stock = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            maxLength: 70
        },
        productNumber: {
            type: String,
            required: true,
            maxLength: 70
        },
        stockCount: {
            type: String,
            required: true,
            maxLength: 70
        },
        expirationDate: {
            type: String,
            required: true,
            maxLength: 70
        },
        brandName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("stock", Stock);
