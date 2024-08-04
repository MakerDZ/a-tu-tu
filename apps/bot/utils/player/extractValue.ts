import { Message } from 'discord.js';
import client from '../../libs/bot';

export function extractValue(message: Message, commandName: string) {
    const botMention = `<@${client.user?.id}>`;
    const prefix = 'sudo';

    let command = '';

    if (message.content.startsWith(prefix)) {
        command = message.content.slice(prefix.length).trim();
    } else if (message.content.startsWith(botMention)) {
        command = message.content.slice(botMention.length).trim();
    } else {
        return null;
    }

    if (command.startsWith(`${commandName} `)) {
        return command.slice(`${commandName} `.length).trim();
    }

    return null;
}
