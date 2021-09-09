const express = require("express");
const router = express.Router();
const Electronics = require("../models/electronics");


const fileUploader = require('../configs/cloudinary');

/* GET home page */
router.get("/", (req, res, next) => {

  // req.query // ?sortPrice=asc  ===>  { sortPrice: 'asc' }
  if (req.query.sortPrice === 'asc') {
    Electronics.find().sort({ price: 1 }).then((electro) => {
      res.render("./electronics/index", { electro: electro });
    });
  } else if (req.query.sortPrice === 'desc') {
    Electronics.find().sort({ price: -1 }).then((electro) => {
      res.render("./electronics/index", { electro: electro });
    });
  } else {
    Electronics.find().then((electro) => {
      res.render("./electronics/index", { electro: electro });
    });
  }


});

router.get("/new", (req, res, next) => {
  res.render("./electronics/new")
});

router.post("/new", fileUploader.array('theImages', 5), (req, res, next) => {
  let newelectro = {
    name: req.body.name,
    model: req.body.model,
    price: req.body.price,
    description: req.body.description,   
  };
  if (req.files[0]) {
    newelectro.first_image = req.files[0].path
  }
  if (req.files[1]) {
    newelectro.second_image = req.files[1].path
  }
  if (req.files[2]) {
    newelectro.third_image = req.files[2].path
  }

  Electronics.create(newelectro).then(() => {
    res.redirect("/electronics");
  });
});

router.get("/:id/edit", (req, res, next) => {
  Electronics.findById(req.params.id).then((electro) => {
    res.render("electronics/edit", { electro: electro });
  });
});

router.post("/:id/edit", (req, res, next) => {
  updatedElectro = {
    name: req.body.name,
    model: req.body.model,
    price: req.body.price,
    description: req.body.description,
  };

  Electronics.findByIdAndUpdate(req.params.id, updatedElectro).then(() => {
    res.redirect("/electronics");
  });
});

router.post("/:id/delete", (req, res, next) => {
  Electronics.findByIdAndRemove(req.params.id).then(() =>
    res.redirect("/electronics")
  );
});

router.get("/:id", (req, res, next) => {
  Electronics.findById(req.params.id).then((electro) => {
    res.render("./electronics/show", { electro: electro });
  });
});


module.exports = router;