const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/blogs/category/:categoryid", async (req, res) => {
  const categoryid = req.params.categoryid;

  try {
    const blogs = await db.execute("SELECT * from blog WHERE categoryid=?", [
      categoryid,
    ]);
    const categories = await db.execute("SELECT * from category");

    res.render("users/blogs", {
      title: "Tüm Kurslar",
      blogs: blogs[0],
      categories: categories[0],
      selectedCategory: categoryid,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blogs = await db.execute("SELECT * from blog WHERE blogid=?", [id]);
    if (blogs[0][0]) {
      return res.render("users/blog-details", {
        title: blogs[0][0].blogTitle,
        blogs: blogs[0][0],
      });
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.get("/blogs", async (req, res) => {
  const blogs = await db.execute("SELECT * from blog WHERE confirm = 1");
  const categories = await db.execute("SELECT * from category");

  try {
    res.render("users/blogs", {
      title: "Tüm Kurslar",
      blogs: blogs[0],
      categories: categories[0],
      selectedCategory: null,
      
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const blogs = await db.execute(
    "SELECT * from blog WHERE homePage = 1 AND confirm = 1"
  );
  const categories = await db.execute("SELECT * from category");

  try {
    res.render("users/index", {
      title: "Popüler Kurslar",
      blogs: blogs[0],
      categories: categories[0],
      selectedCategory: null
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
