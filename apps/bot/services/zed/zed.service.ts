import { Message } from 'discord.js';
import { botConfig } from '../../config/bot';
import { join } from 'path';
import actionsLoader from '../../utils/actionLoader';
import client from '../../libs/bot';

export function isZedService(message: Message) {
    if (message.author.id !== botConfig.zedId) return false;

    return (
        message.mentions.users.first()?.id === client.user?.id ||
        message.content.startsWith('sudo')
    );
}

export async function ZedServiceHandler(message: Message) {
    const actionName = message.content.split(' ')[1];
    const actionToExecute = actions.find((a: any) => a.name === actionName);
    if (actionToExecute) {
        await actionToExecute.execute(message);
    }
}

let actions: any = null;
const actionsFolder = join(__dirname, '/actions');

async function loadingActions() {
    actions = await actionsLoader(actionsFolder);
}
loadingActions();
