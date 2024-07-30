import { Client, CommandInteraction, Interaction } from 'discord.js';

import { join } from 'path';
import actionsLoader from '../../utils/actionLoader';

const actionsFolder = join(__dirname, '/actions');

export default async function commandInteraction(
    client: Client,
    interaction: Interaction
) {
    const cmdInteraction = interaction as CommandInteraction;
    const commandName = cmdInteraction.commandName;
    const actions = await actionsLoader(actionsFolder);
    const actionToExecute = actions.find((a) => a.name === commandName);
    if (actionToExecute) {
        await actionToExecute.execute(interaction);
    } else {
        console.log('Command not found.');
    }
}
