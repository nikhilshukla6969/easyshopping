const express = require("express");
const router = express.Router();
const Properties = require("../models/properties");

router.get("/", (req, res, next) => {
  Cloths.find().then((properties) => {
    res.render("./properties/index", { properties: properties });
  });
});

router.get("/new", (req, res, next) => {
    res.render("./properties/new");
});

router.post("/new", (req, res, next) => {
  Properties.create({
    type: req.body.type,
    color: req.body.color,
    price: req.body.price,
  }).then(() => {
    res.redirect("/properties");
  });
});

router.post("/:id/delete", (req, res, next) => {
  Cloths.findByIdAndRemove(req.params.id).then(() => res.redirect("/properties"));
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
  updatedproperties = {
    type: req.body.type,
    color: req.body.color,
    price: req.body.price,
  };

  cloths.findByIdAndUpdate(req.params.id, updatedproperties).then(() => {
    res.redirect("/properties");
  });
});

router.get("/:id", (req, res, next) => {
  cloths.findById(req.params.id)
    //.populate("cast")
    .then((properties) => {
      res.render("./movies/cloths-details", { cloths: cloths });
    });
});
module.exports = router;