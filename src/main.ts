import { eventsResponse } from './controllers'
import { getServerUptime } from './misc'
import { validateType } from './validateMiddleware'
import { Request, Response, NextFunction} from 'express'
import express from 'express'
import bodyParser from 'body-parser'

const app = express();
const pageNotFound = '<p>Page not found</p>';
const port = 8000;

// Body parser to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Make response for uptime
app.all("/status", (req, res) => res.send(getServerUptime()));

// Make responses for events route
app.all("/api/events", validateType, eventsResponse);

// Route other addresses to error page
app.all("*", (req, res) => res.status(404).send(pageNotFound));

// Put url into console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


// Make a middleware to handle errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(err);
	res.status(500).send(err);
});


