import client from '../libs/bot';
import loadServerCommands from '../libs/serverCommandLoader';


export default {
    name: 'ready',
    once: true,
    execute() {
        console.log(`${client.user?.tag} is logged in.`);
        const guilds = client.guilds.cache;
        const guildIds = guilds.map((guild) => guild.id);

        /* We currently don't need to load server related commands. */
        //loadServerCommands(guildIds)
    },
};
