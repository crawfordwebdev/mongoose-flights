import { Flight } from '../models/flight.js'


function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights', {
      title: "All Flights",
      flights: flights
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function newFlight(req, res) {
  const newFlight = new Flight()
  // Obtain the default date
  const dt = newFlight.departs
  // Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16)

  res.render("flights/new", {
    title: "Add Flight",
    departs: departsDate
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }

  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/flights`)
  }) 
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

export {
  newFlight as new,
  create,
  index,
}