import { CommandInteraction } from 'discord.js';
import AboutBot from '../../../components/AboutBot';

export default {
    name: 'about',
    async execute(interaction: CommandInteraction) {
        await interaction.reply(AboutBot());
    },
};
