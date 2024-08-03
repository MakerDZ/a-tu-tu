import { CommandInteraction } from 'discord.js';

export default {
    name: 'health',
    async execute(interaction: CommandInteraction) {
        await interaction.reply('Yea, I m still alive.');
    },
};
