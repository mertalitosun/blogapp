const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

const Blog = require("./models/blog");
const Category = require("./models/category");

app.use(express.static("node_modules"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(userRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
