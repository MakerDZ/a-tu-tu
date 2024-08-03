import { Guild } from 'discord.js';

export default {
    name: 'guildCreate',
    once: false,
    async execute(guild: Guild) {
        console.log('someone invited the bot.');
        console.log(guild.id);
    },
};
