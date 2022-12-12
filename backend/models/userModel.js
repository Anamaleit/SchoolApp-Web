const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const baseSchema = require('../../frontend/src/shared/base-schema/user.js');

const schema = new mongoose.Schema(baseSchema.schema);

// static singup method
schema.statics.signup = async function(email, password) {

  // validation 
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
      throw Error('Email already used')
  }

  // password encryption 
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user

}

// static login method
schema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user

}

module.exports = mongoose.model('User', schema)