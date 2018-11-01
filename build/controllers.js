"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const misc_1 = require("./misc");
const LIMIT = 30;
// Create final response with json
async function eventsResponse(req, res) {
    let response = {};
    const eventsJson = await misc_1.getEvents();
    const type = req.body.type || req.query.type;
    if (type !== undefined) {
        const requestedTypes = type.split(":");
        const filteredEvents = eventsJson.events
            ? eventsJson.events.filter((e) => requestedTypes.includes(e.type))
            : [];
        response.events = [...filteredEvents];
    }
    else {
        response.events = eventsJson.events;
    }
    const reqLimit = req.body.limit || req.query.limit;
    const reqSkip = req.body.skip || req.query.skip;
    if (reqLimit || reqSkip) {
        const skip = reqSkip || 0;
        const limit = reqLimit || LIMIT;
        response = {
            events: response.events
                ? response.events.slice(+skip, +skip + +limit)
                : []
        };
    }
    res.send(response);
}
exports.eventsResponse = eventsResponse;
