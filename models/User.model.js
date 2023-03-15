const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [3, 'La longitud mínima de la contraseña es de 3 caracteres']
    },
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
    },
    description: {
      type: String,

    },
    image: {
      type: String,
      default: 'https://res.cloudinary.com/diwmrtyix/image/upload/v1678728653/r0hr4eruhytapfqgbjbu.png'

    },
    hourlyRate: {
      type: Number,
    },
    favoriteServices: [{
      type: Schema.Types.ObjectId,
      ref: 'service'
    }],
    role: {
      type: String,
      enum: ['admin', 'user', 'adver'],
      default: 'user'
    }
  },
  {

    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const { _id, firstName, email, role } = this
  const payload = { _id, firstName, email, role }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}
userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}


const User = model("User", userSchema);

module.exports = User;
