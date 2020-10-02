// event routes
// /api/events

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/events');

const isDate = require('../helpers/isDate');

const fieldValidator = require('../middlewares/fieldValidator');

const validateJWT = require('../middlewares/validateJWT');

// using the validateJWT middleware in all the end points
router.use(validateJWT);

// request to get events
router.get('/', getEvents);

// request to create a new event
router.post(
    '/',
    [
        check('title', 'The title is mandatory').not().isEmpty(),
        check('start', 'The start date is mandatory').custom(isDate),
        check('end', 'The end date is mandatory').custom(isDate),
        fieldValidator,
    ],
    createEvent
);

// request to update an event by it's id
router.put(
    '/:id',
    [
        check('title', 'The title is mandatory').not().isEmpty(),
        check('start', 'The start date is mandatory').custom(isDate),
        check('end', 'The end date is mandatory').custom(isDate),
        fieldValidator,
    ],
    updateEvent
);

// request to delete an event by it's id
router.delete('/:id', deleteEvent);

module.exports = router;
