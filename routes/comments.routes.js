const router = require("express").Router()

const Service = require('./../models/Service.model')
const Comment = require('./../models/Comment.model')
const { verifyToken } = require("../middlewares/verifyToken")

router.post("/newComment/:service_id", verifyToken, (req, res, next) => {

    const owner = req.payload._id
    const { service_id } = req.params
    const { comment } = req.body


    Comment
        .create({ owner, comment })
        .then((comment) => {
            Service
                .findByIdAndUpdate(service_id, { $addToSet: { comments: comment._id } }, { new: true })
                .then(response => res.json(response))
                .catch(err => next(err))
        })

})

router.delete("/delete/:service_id/:comment_id", verifyToken, (req, res, next) => {

    const { service_id, comment_id } = req.params

    Service
        .findByIdAndUpdate(service_id, { $pull: { comments: comment_id } })
        .then(() => {
            Comment
                .findByIdAndDelete(comment_id)
                .then(response => res.json(response))
                .catch(err => next(err))
        })

})


module.exports = router