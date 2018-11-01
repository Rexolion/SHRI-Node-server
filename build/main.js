"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const misc_1 = require("./misc");
const validateMiddleware_1 = require("./validateMiddleware");
const app = express_1.default();
const pageNotFound = "<p>Page not found</p>";
const port = 8000;
// Body parser to handle POST requests
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Make response for uptime
app.all("/status", (req, res) => res.send(misc_1.getServerUptime()));
// Make responses for events route
app.all("/api/events", validateMiddleware_1.validateType, controllers_1.eventsResponse);
// Route other addresses to error page
app.all("*", (req, res) => res.status(404).send(pageNotFound));
// Put url into console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// Make a middleware to handle errors
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err);
});
