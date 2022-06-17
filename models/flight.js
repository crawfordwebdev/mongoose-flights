import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    required: true
  },
  airport: {
    type: String,
    required: true
  },
  flightNo: {
    type: Number,
    required: true
  },
  departs: {
    type: Date, 
    default: function() {
      let currentDate = new Date()
      return `${currentDate.getFullYear}-${currentDate.getMonth}-${currentDate.getDate}`
    }
  }
})

const Flight = mongoose.model("Flights", flightSchema)

export {
  Flight
}
