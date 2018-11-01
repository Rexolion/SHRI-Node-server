"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TYPES = ["info", "critical"];
// Validate requested types
function validateType(req, res, next) {
    const reqType = req.body.type || req.query.type;
    if (reqType) {
        const requestedTypes = reqType.split(":");
        requestedTypes.forEach(type => {
            if (!TYPES.includes(type)) {
                res.status(400).send("Incorrect type");
                return next("Incorrect type caught in middleware: " + type);
            }
        });
    }
    next();
}
exports.validateType = validateType;
