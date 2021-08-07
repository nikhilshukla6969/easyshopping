const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.js");

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render("celebrities/index", { celebrities: celebrities });
        })
});

router.get("/celebrities/new", (req, res, next) => {
    res.render('celebrities/new')
});

router.get("/celebrities/:id", (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((celebrity) =>
            res.render("celebrities/show", { celebrity: celebrity })
        )
        .catch((err) => {
            console.log("Error occured while finding the celebrity", err);
            res.redirect("/celebrities");
        });
});

router.post("/celebrities", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
      .then(() => {
        Celebrity.save().then(res.render("/celebrities"));
      })
      .catch((err) => {
        console.log("Error occured", err);
        res.redirect("/celebrities/new");
      });
  });
  
  router.post("/celebrities/delete/:id", (req, res, next) => {
    const id = req.params.id;
    Celebrity.findByIdAndDelete(id)
      .then(res.redirect("/celebrities"))
      .catch((err) => {
        console.log("Error occured", err);
      });
  });
module.exports = router;

