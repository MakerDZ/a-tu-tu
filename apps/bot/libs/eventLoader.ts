import client from './bot';
import * as fs from 'fs';
import { join } from 'path';

const eventsFolder = join(__dirname, '..', 'events');
export default function loadEvents() {
    const eventFiles = fs
        .readdirSync(eventsFolder)
        .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
    for (const file of eventFiles) {
        const { default: event } = require(join(eventsFolder, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}
