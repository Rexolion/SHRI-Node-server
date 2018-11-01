import { NextFunction, Request, Response } from "express";
import { getEvents } from "./misc";
const LIMIT = 30;

// Create final response with json
export async function eventsResponse(req: Request, res: Response) {
  let response: ApiResponse = {};
  const eventsJson = await getEvents();
  const type: string = req.body.type || req.query.type;
  if (type !== undefined) {
    const requestedTypes = type.split(":");
    const filteredEvents = eventsJson.events
      ? eventsJson.events.filter((e: JsonEvents) =>
          requestedTypes.includes(e.type)
        )
      : [];
    response.events = [...filteredEvents];
  } else {
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
