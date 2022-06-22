import { Router } from 'express'
import * as flightsCtrl from "../controllers/flights.js"

const router = Router()

/* GET flights. */
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)

// GET localhost:3000/flights/:id
router.get('/:id', flightsCtrl.show)


// POST localhost:3000/flights
router.post('/', flightsCtrl.create)

// DELETE localhost:3000/flights/:id
router.delete('/:id', flightsCtrl.delete)


// POST localhost:3000/flights/:id/tickets
router.post('/:id/tickets', flightsCtrl.createTicket)

// DELETE localhost:3000/flights/:id/tickets/:idx
router.delete('/:id/tickets/:idx', flightsCtrl.deleteTicket)


// POST localhost:3000/flights/:id/meals
router.post('/:id/meals', flightsCtrl.addToMeal)

// DELETE localhost:3000/flights/:id/meals/:id
router.delete('/:id/meals/:mealId', flightsCtrl.removeMeal)


export {
  router
}
