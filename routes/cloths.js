const express = require("express");
const router = express.Router();
const Cloths = require("../models/cloths");

router.get("/", (req, res, next) => {
  Cloths.find().then((cloths) => {
    res.render("./cloths/index", { cloths: cloths });
  });
});

router.get("/new", (req, res, next) => {
    res.render("./cloths/new");
});

router.post("/new", (req, res, next) => {
  Cloths.create({
    type: req.body.type,
    color: req.body.color,
    price: req.body.price,
  }).then(() => {
    res.redirect("/cloths");
  });
});

router.post("/:id/delete", (req, res, next) => {
  Cloths.findByIdAndRemove(req.params.id).then(() => res.redirect("/cloths"));
});

//router.get("/:id/edit", (req, res, next) => {
  //let electronicsPromise = electronics.find();
  //let clothsPromise = cloths.findById(req.params.id).populate("cast");
  //Promise.all([celebrityPromise, moviePromise]).then((data) => {
    //res.render("movies/edit", { data: data });
    //res.send(data);
  //});
//});

router.post("/:id/edit", (req, res, next) => {
  updatedcloths = {
    type: req.body.type,
    color: req.body.color,
    price: req.body.price,
  };

  cloths.findByIdAndUpdate(req.params.id, updatedcloths).then(() => {
    res.redirect("/cloths");
  });
});

router.get("/:id", (req, res, next) => {
  cloths.findById(req.params.id)
    //.populate("cast")
    .then((cloths) => {
      res.render("./cloths/cloths-details", { cloths: cloths });
    });
});
module.exports = router;