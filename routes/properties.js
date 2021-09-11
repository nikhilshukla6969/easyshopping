const express = require("express");
const router = express.Router();
const properties = require("../models/properties");

router.get("/", (req, res, next) => {
  // req.query // ?sortPrice=asc  ===>  { sortPrice: 'asc' }
  if (req.query.sortPrice === 'asc') {
    properties.find().sort({ price: 1 }).then((prop) => {
      res.render("./properties/index", { prop: prop });
    });
  } else if (req.query.sortPrice === 'desc') {
    properties.find().sort({ price: -1 }).then((prop) => {
      res.render("./properties/index", { prop: prop });
    });
  } else {
    properties.find().then((prop) => {
      res.render("./properties/index", { prop: prop });
    });
  }
});

router.get("/new", (req, res, next) => {
    res.render("./properties/new");
});

router.post("/new", (req, res, next) => {
  console.log("req body", req.body)
  properties.create({
    name: req.body.name,
    area: req.body.area,
    price: req.body.price,
    description: req.body.description,
  }).then(() => {
    res.redirect("/properties");
  });
});

router.post("/:id/delete", (req, res, next) => {
  properties.findByIdAndRemove(req.params.id).then(() => res.redirect("/properties"));
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
    area: req.body.area,
    price: req.body.price,
  };

  properties.findByIdAndUpdate(req.params.id, updatedproperties).then(() => {
    res.redirect("/properties");
  });
});

router.get("/:id", (req, res, next) => {
  properties.findById(req.params.id)
    //.populate("cast")
    .then((properties) => {
      res.render("./properties/show", { properties: properties });
    });
});
module.exports = router;