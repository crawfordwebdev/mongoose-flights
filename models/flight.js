import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0
  }

})

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
      // return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      const today = new Date()
      const oneYearFromNow = today.getFullYear() + 1
      today.setFullYear(oneYearFromNow)
      return today
    }
  },
  tickets: [ticketSchema]
})

const Flight = mongoose.model("Flights", flightSchema)

export {
  Flight
}
