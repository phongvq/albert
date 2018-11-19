const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const saltRounds = 10
const ObjectId = mongoose.Schema.ObjectId
const Schema = mongoose.Schema

const accessSchema = new Schema({
  ipv4: {
    type: String,
    required: true
  },
  redirected: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

const restrictionSchema = new Schema({
  method: {
    type: String,
    required: true
  },
  limitAllIpPerDay: {
    type: Number,
    default: 86400
  },
  timeOutDuration: {
    type: Number,
    default: 5
  }
})

const urlSchema = new Schema({
  shortened: {
    type: String,
    required: true,
    unique: true
  },
  original: {
    type: String,
    required: true
  },
  owner: {
    type: ObjectId,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  password: String,
  restriction: restrictionSchema,
  accesses: [accessSchema],
  active: {
    type: Boolean,
    default: true
  }
})


urlSchema.pre('save', async function() {
  const hash = await bcrypt.hashSync(this.password, saltRounds)
  this.password = hash
})

urlSchema.methods.validatePassword = async function(candidatePassword) {
  return await (bcrypt.compareSync(candidatePassword, this.password))
}


const Url = mongoose.model('Url', urlSchema)
module.exports = Url
