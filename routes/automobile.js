const express = require("express");
const router = express.Router();
const automobile = require("../models/automobile");

router.get("/", (req, res, next) => {
  automobile.find().then((automobile) => {
    res.render("./automobile/index", { automobile: automobile });
  });
});

router.get("/new", (req, res, next) => {
    res.render("./automobile/new");
});

router.post("/new", (req, res, next) => {
  automobile.create({
    type: req.body.type,
    color: req.body.color,
    price: req.body.price,
  }).then(() => {
    res.redirect("/automobile");
  });
});

router.post("/:id/delete", (req, res, next) => {
  automobile.findByIdAndRemove(req.params.id).then(() => res.redirect("/automobile"));
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
  updatedautomobile = {
    type: req.body.type,
    color: req.body.color,
    price: req.body.price,
  };

  cloths.findByIdAndUpdate(req.params.id, updatedautomobile).then(() => {
    res.redirect("/automobile");
  });
});

router.get("/:id", (req, res, next) => {
  cloths.findById(req.params.id)
    //.populate("cast")
    .then((automobile) => {
      res.render("./automobile/automobile-details", { automobile: automobile });
    });
});
module.exports = router;