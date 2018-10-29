import fs from 'fs';

// Count time from server start
export function getServerUptime() {
	const secs = Math.floor(process.uptime());
	const date = new Date(0);
	date.setSeconds(secs);
	return date.toISOString().substr(11, 8);
}

// Get events from json file
export function getEvents() {
    return new Promise<ApiResponse>((resolve, reject) => {
        fs.readFile(`data/events.json`, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
} 