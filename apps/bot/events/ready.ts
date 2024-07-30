import client from '../libs/bot';
import loadServerCommands from '../libs/serverCommandLoader';
import loadUserCommands from '../libs/userCommandLoader';
('../libs/serverCommandLoader');

export default {
    name: 'ready',
    once: true,
    execute() {
        console.log(`${client.user?.tag} is logged in.`);
        const guilds = client.guilds.cache;
        const guildIds = guilds.map((guild) => guild.id);
        loadServerCommands(guildIds);
        loadUserCommands();
    },
};
