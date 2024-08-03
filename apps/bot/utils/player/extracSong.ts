import { Message } from 'discord.js';
import client from '../../libs/bot';

export function extractSongName(message: Message) {
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

    if (command.startsWith('play ')) {
        return command.slice('play '.length).trim();
    }

    return null;
}
