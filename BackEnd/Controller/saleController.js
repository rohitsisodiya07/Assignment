
const Sale = require("../Model/SaleModel");

const createSales = async (req, res) => {
    try {
        const salesData = [
            {
                productName: "Laptop",
                category: "Electronics",
                quantity: 1,
                price: 50000,
                amount: 50000,
                status: "shipped",
            },
            {
                productName: "Mobile",
                category: "Electronics",
                quantity: 2,
                price: 10000,
                amount: 20000,
                status: "shipped",
            },
            {
                productName: "Chair",
                category: "Furniture",
                quantity: 1,
                price: 5000,
                amount: 5000,
                status: "shipped",
            },
            {
                productName: "Table",
                category: "Furniture",
                quantity: 1,
                price: 8000,
                amount: 8000,
                status: "pending",
            },
            {
                productName: "Headphones",
                category: "Electronics",
                quantity: 1,
                price: 3000,
                amount: 3000,
                status: "shipped",
            },
        ];

        const result = await Sale.insertMany(salesData);

        res.status(201).json({
            message: "Sales data inserted successfully",
            count: result.length,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to insert sales data",
            error: error.message,
        });
    }
};


const getSalesByCategory = async (req, res) => {
    try {
        const result = await Sale.aggregate([
            {
                $match: {
                    status: "shipped",
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $sort: {
                    total: -1,
                },
            },
        ]);

        res.status(200).json({
            message: "Category-wise sales fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch sales",
            error: error.message,
        });
    }
};


module.exports = { createSales, getSalesByCategory };
