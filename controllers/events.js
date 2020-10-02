const { response } = require('express');

const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate('user', 'name');

    return res.json({ ok: true, events });
};

const createEvent = async (req, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.u_id;

        const eventCreated = await event.save();

        return res.status(201).json({ ok: true, event: eventCreated });
    } catch (error) {
        console.log(error);

        return res
            .status(500)
            .json({ ok: false, msg: 'Please contact the admin' });
    }
};

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const userId = req.u_id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'The event does not exist',
            });
        }

        if (event.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not allowed to perform this action',
            });
        }

        const newEvent = { ...req.body, user: userId };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true,
        });

        res.status(201).json({ ok: true, event: updatedEvent });
    } catch (error) {
        console.log(error);

        res.status(500).json({ ok: false, msg: 'Please contact the admin' });
    }
};

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const userId = req.u_id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res
                .status(404)
                .json({ ok: false, msg: 'The event does not exist' });
        }

        if (event.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not allowed to perform this action',
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.status(201).json({ ok: true });
    } catch (error) {
        console.log(error);

        return res
            .status(500)
            .json({ ok: false, msg: 'Please contact the admin' });
    }

    return res.json({ ok: true, msg: 'deleteEvent' });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
