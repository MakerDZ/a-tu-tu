import { EmbedBuilder } from 'discord.js';

interface Prop {
    title: string;
    message: string;
    ephemeral?: boolean;
}

export function ErrorMesssage(error: Prop) {
    const reply = new EmbedBuilder()
        .setAuthor({
            name: error.title,
            iconURL: 'https://cdn.stickers.gg/stickers/4493-eyes.png',
        })
        .setDescription(error.message)
        .setColor('#ff0000')
        .setTimestamp();
    return {
        embeds: [reply],
        ephemeral: error.ephemeral ? error.ephemeral : false,
    };
}
