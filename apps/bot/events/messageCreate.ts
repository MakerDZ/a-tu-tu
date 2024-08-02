import { Message } from 'discord.js';
import client from '../libs/bot';

export default {
    name: 'messageCreate',
    once: false,
    async execute(message: Message) {
        if (message.author.bot) return;

        try {
            const user = await client.users.fetch('995986602973200414');
            if (user) {
                user.send(message.content);
            }
        } catch (err) {
            console.log(err);
        }
    },
};
