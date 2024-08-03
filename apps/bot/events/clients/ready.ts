import client from '../../libs/bot';
import { playerEvents } from '../player/events';

export default {
    name: 'ready',
    once: true,
    execute() {
        console.log(`${client.user?.tag} is logged in.`);

        // For music player events
        playerEvents();

        // const guilds = client.guilds.cache;
        // const guildIds = guilds.map((guild) => guild.id);
    },
};
