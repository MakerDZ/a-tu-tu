import { Message } from 'discord.js';
import {
    isZedService,
    ZedServiceHandler,
} from '../../services/zed/zed.service';

export default {
    name: 'messageCreate',
    once: false,
    async execute(message: Message) {
        if (message.author.bot) return;

        if (isZedService(message)) {
            await ZedServiceHandler(message);
        }
    },
};
