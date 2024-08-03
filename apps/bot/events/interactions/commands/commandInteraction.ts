import { Client, CommandInteraction, Interaction } from 'discord.js';

import { join } from 'path';
import actionsLoader from '../../../utils/actionLoader';

let actions: any = null;
const actionsFolder = join(__dirname, '/actions');

async function loadingActions() {
    actions = await actionsLoader(actionsFolder);
}
loadingActions();

export default async function commandInteraction(interaction: Interaction) {
    const cmdInteraction = interaction as CommandInteraction;
    const commandName = cmdInteraction.commandName;
    const actionToExecute = actions.find((a: any) => a.name === commandName);
    if (actionToExecute) {
        await actionToExecute.execute(interaction);
    } else {
        console.log('Command not found.');
    }
}
