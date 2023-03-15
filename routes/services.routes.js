const router = require("express").Router();

const Service = require('./../models/Service.model')
const { verifyToken } = require("../middlewares/verifyToken")

router.get("/getAllServices", (req, res, next) => {

  Service
    .find()
    .sort({ title: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.get("/getCategoryServices", (req, res, next) => {

  const { query } = req.query

  Service
    .find({ category: query })
    .sort({ title: 1 })
    .select({ title: 1, image: 1, owner: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/getOneService/:service_id", (req, res, next) => {

  const { service_id } = req.params

  Service
    .findById(service_id)
    .populate('comments')
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/saveService", verifyToken, (req, res, next) => {

  const { title, description, image, prize, location, category, phone } = req.body
  const { _id: owner } = req.payload

  Service
    .create({ title, description, image, prize, location, category, owner, phone })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.put("/editService/:service_id", verifyToken, (req, res, next) => {
  const { service_id } = req.params;
  const { title, description, image, prize, location, annuncement, category } = req.body;

  Service.findByIdAndUpdate(service_id, { title, description, image, prize, location, annuncement, category }, { new: true })
    .then(updatedService => {
      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(updatedService);
    })
    .catch(err => next(err));
});

router.delete("/deleteService/:service_id", verifyToken, (req, res, next) => {
  const { service_id } = req.params;
  Service
    .findByIdAndDelete(service_id)
    .then(() => res.json({ message: "Service deleted successfully" }))
    .catch(err => next(err))
})
module.exports = router



