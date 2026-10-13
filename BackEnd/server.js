require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected.."))
    .catch(() => console.log("error occur"))

const userRoutes = require("./Routes/userRoute");
const saleRoute = require("./Routes/saleRoute");


app.use("/user", userRoutes);
app.use("/sales", saleRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Nodejs Backend!!!');
})
app.listen(PORT, () => {
    console.log("Server is Running on Port", PORT);
})