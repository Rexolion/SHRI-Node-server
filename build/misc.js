"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// Count time from server start
function getServerUptime() {
    const secs = Math.floor(process.uptime());
    const date = new Date(0);
    date.setSeconds(secs);
    return date.toISOString().substr(11, 8);
}
exports.getServerUptime = getServerUptime;
// Get events from json file
function getEvents() {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile("data/events.json", "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
}
exports.getEvents = getEvents;
