import { Flight } from '../models/flight.js'
import { Meal } from '../models/meals.js'

function index(req, res) {
  Flight.find({})
  .then(flights => {
    flights.forEach( flight => {
      if (flight.departs.toISOString() < new Date().toISOString()) {
        flight.color = 'red'
      }
    })
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

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render("flights/show", {
        flight: flight,
        title: `${flight.airline}: Flight ${flight.flightNo}`,
        meals: meals
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  })

}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/flights")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function deleteTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets[req.params.idx].remove()
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function addToMeal(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function removeMeal(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.remove({ _id: req.params.mealId })
    flight.save()
    .then(flight => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  })
}


export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  createTicket,
  deleteTicket,
  removeMeal,
  addToMeal,
}