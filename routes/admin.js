const express = require("express");
const router = express.Router();
const fs = require("fs");
const db = require("../data/db");
const imgUpload = require("../helpers/img-upload")


router.get("/admin/category/delete/:id",async(req,res)=>{
  const id = req.params.id
  try{
    const [category, ] = await db.execute("SELECT * FROM category WHERE categoryid=?",[id])
    res.render("admin/category-delete",{
      title: "Kategori Silme",
      categories: category[0]
    })
  }catch(err){
    console.log(err)
  }
})
router.post("/admin/category/delete/:id",async(req,res)=>{
  const id = req.params.id
  try{
    await db.execute("DELETE FROM category WHERE categoryid=?",[id])
    res.redirect("/admin/categories?action=delete")
  }catch(err){
    console.log(err)
  }
})
router.get("/admin/category/create", async (req,res)=>{
  try{
   res.render("admin/category-create",{
    title: "Kategori Ekleme"
   })
  }catch(err){
    console.log(err)
  }
})
router.post("/admin/category/create", async (req,res)=>{
  const categoryName = req.body.categoryName;
  try{
   await db.execute("INSERT INTO category(categoryName) VALUES(?)",[categoryName])
   res.redirect("/admin/categories?action=create")
  }catch(err){
    console.log(err)
  }
})

router.get("/admin/category/:id", async(req,res)=>{
  const id = req.params.id
  try{
    const [categories, ] = await db.execute("SELECT * FROM category WHERE categoryid=?",[id])
    res.render("admin/category-edit",{
      title: "Kategori Edit",
      categories: categories[0]
    })
  }catch(err){
    console.log(err)
  }
})

router.post("/admin/category/:id", async(req,res)=>{
  const id = req.body.categoryid;
  const categoryName = req.body.categoryName;
  try{
    await db.execute("UPDATE category SET categoryName=? WHERE categoryid=?",[categoryName,id]);
    res.redirect("/admin/categories?action=edit");
  }catch(err){
    console.log(err)
  }
})

router.get("/admin/categories", async (req,res)=>{
  try{
    const [categories, ] = await db.execute("SELECT * FROM category")
    res.render("admin/category-list",{
      title:"Kategori Listesi",
      categories: categories,
      action: req.query.action
    })
  }catch(err){
    console.log(err)
  }
})


router.get("/admin/blog/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [blogs, ] = await db.execute("SELECT * FROM blog WHERE blogid=?", [id]);
    const blog = blogs[0];
    res.render("admin/blog-delete", {
      title: "delete",
      blog: blog,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/admin/blog/delete/:id", async(req,res)=>{
  const id = req.body.blogid;
  try{
    await db.execute("DELETE FROM blog WHERE blogid=?",[id])
    res.redirect("/admin/blogs?action=delete")
  }
  catch(err){
    console.log(err)
  }
})

router.get("/admin/blog/create", async (req, res) => {
  try {
    const [categories] = await db.execute("SELECT * from category");
    res.render("admin/blog-create", {
      title: "add blog",
      categories: categories,
    });
  } catch (err) {
    console.log(err);
  }
});


router.post("/admin/blog/create", imgUpload.upload.single("resim"),async (req, res) => {
  const baslik = req.body.baslik;
  const altbaslik = req.body.altbaslik;
  const aciklama = req.body.aciklama;
  const resim = req.file.filename;
  const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
  const onay = req.body.onay == "on" ? 1 : 0;
  const kategori = req.body.kategori;

  try {
    console.log(resim)
    await db.execute(
      "INSERT INTO blog(blogTitle,altbaslik,blogDesc,img,homePage,confirm,categoryid) VALUES (?,?,?,?,?,?,?)",
      [baslik,altbaslik, aciklama, resim, anasayfa, onay, kategori]
    );
    res.redirect("/admin/blogs?action=create");
  } catch (err) {
    console.log(err);
  }
});

router.get("/admin/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [blogs] = await db.execute("SELECT * FROM blog WHERE blogid=?", [id]);
    const [categories] = await db.execute("SELECT * FROM category");
    const blog = blogs[0];

    if (blog) {
      return res.render("admin/blog-edit", {
        title: blog.blogTitle,
        blog: blog,
        categories: categories,
      });
    }
    res.redirect("/admin/blogs");
  } catch (err) {
    console.log(err);
  }
});

router.post("/admin/blogs/:id",imgUpload.upload.single("resim"), async (req, res) => {
  const id = req.body.blogid;
  const baslik = req.body.baslik;
  const altbaslik = req.body.altbaslik;
  const aciklama = req.body.aciklama;
  let resim = req.body.resim;
  if(req.file){
    resim = req.file.filename;

    fs.unlink("./public/images/" + req.body.resim, err=>{
      console.log(err)
    });
  }
  const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
  const onay = req.body.onay == "on" ? 1 : 0;
  const kategori = req.body.kategori;

  try {
    await db.execute(
      "UPDATE blog SET blogtitle=?,altbaslik=?,blogDesc=?,img=?,homePage=?,confirm=?,categoryid=? WHERE blogid=?",
      [baslik,altbaslik, aciklama, resim, anasayfa, onay, kategori, id]
    );
    res.redirect("/admin/blogs?action=edit");
  } catch (err) {
    console.log(err);
  }
});

router.get("/admin/blogs", async (req, res) => {
  try {
    const [blogs] = await db.execute("SELECT blogid,blogTitle,altbaslik,img FROM blog");
    res.render("admin/blog-list", {
      title: "blog list",
      blogs: blogs,
      action: req.query.action
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
