const { mongoose } = require('mongoose');

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
        imageUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("stock", Stock);
