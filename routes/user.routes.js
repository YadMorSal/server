const router = require("express").Router()
const User = require('./../models/User.model')
const { verifyToken } = require("../middlewares/verifyToken")


router.get("/getAllUsers", (req, res, next) => {

    User
        .find()
        .sort({ email: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get("/getOneUser/:user_id", (req, res, next) => {

    const { user_id } = req.params


    User
        .findById(user_id)
        .populate("favoriteServices")
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        })
        .catch(err => next(err))
})


router.put('/editUser/:id', (req, res, next) => {
    const { id } = req.params;
    const { email, firstName, lastName, phone, description, role, image, hourlyRate } = req.body;

    User
        .findByIdAndUpdate(id, {
            email,
            firstName,
            lastName,
            phone,
            description,
            image,
            hourlyRate,

            role
        }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(updatedUser);
        })
        .catch(err => next(err));
})

router.put('/addToFav/:service_id', verifyToken, (req, res, next) => {

    const { service_id } = req.params
    const { _id: user_id } = req.payload

    User.findByIdAndUpdate(user_id, { $addToSet: { favoriteServices: service_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err));
})


router.put('/removeFromFav/:service_id', verifyToken, (req, res, next) => {
    const { service_id } = req.params;
    const { _id: user_id } = req.payload;

    User.findByIdAndUpdate(user_id, { $pull: { favoriteServices: service_id } }, { new: true })
        .then(({ data }) => res.json(data))
        .catch(err => next(err));
})

router.put('/editProfile/:id', (req, res, next) => {
    const { id } = req.params;
    const { email, firstName, lastName, phone, description } = req.body;

    User
        .findByIdAndUpdate(id, {
            email,
            firstName,
            lastName,
            phone,
            description
        }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(updatedUser);
        })
        .catch(err => next(err));
})


router.delete('/deleteUser/:id', (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndDelete(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deleted successfully" });
        })
        .catch(err => next(err));
});

module.exports = router