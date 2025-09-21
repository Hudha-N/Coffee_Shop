const express = require("express");
const cors = require("cors");
require("dotenv").config();

const categoryRoutes = require("./routes/categoryRoutes");
const coffeeRoutes = require("./routes/coffeeRoutes");

const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cartRoutes = require("./routes/cartRoutes");
const messageRoutes = require("./routes/messageRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/categories", categoryRoutes);
app.use("/api/coffees", coffeeRoutes);

app.use("/api/users", userRoutes);
app.use("/auth", customerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use('/images', express.static(__dirname + '/public'));


app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});


