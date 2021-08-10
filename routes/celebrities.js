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
});

router.post("/celebrities", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
      .then(() => {
        res.redirect("/celebrities");
      })

  });
  
  router.post("/celebrities/delete/:id", (req, res, next) => {
    const id = req.params.id;
    Celebrity.findByIdAndDelete(id)
      .then(res.redirect("/celebrities"))
   
  });

  router.get("/celebrities/:id/edit", (req, res, next) => {
    Celebrity.findById(req.params.id)
      .then((celebrity) => res.render("celebrity/edit", { celebrity: celebrity }))

  });
  
  router.post("/celebrities/:id", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
  
    Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
      .then(
        Celebrity.save().then((id) => {
          res.redirect("/celebrities/:id", { id: id });
        })
      )
  });

module.exports = router;

