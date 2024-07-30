import { Interaction, Client } from 'discord.js';
import commandInteraction from '../interactions/commands/commandInteraction';

export default {
    name: 'interactionCreate',
    once: false,
    async execute(interaction: Interaction, client: Client) {
        if (!interaction.isChatInputCommand() && !interaction.isButton())
            return;

        if (interaction.isChatInputCommand()) {
            try {
                await commandInteraction(client, interaction);
            } catch (error) {
                console.log(error);
            }
        }
    },
};
