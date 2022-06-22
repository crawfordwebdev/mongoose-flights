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

// POST localhost:3000/flights
router.post('/:id/tickets', flightsCtrl.createTicket)

export {
  router
}
