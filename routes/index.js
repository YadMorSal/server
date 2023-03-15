const router = require("express").Router()


const serviceRoutes = require("./services.routes")
router.use("/services", serviceRoutes)

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

const commentsRoutes = require("./comments.routes")
router.use("/comments", commentsRoutes)

module.exports = router