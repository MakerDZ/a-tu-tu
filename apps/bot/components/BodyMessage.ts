import { EmbedBuilder } from 'discord.js';

interface Prop {
    title?: string;
    footerText?: string;
    footerIconURL?: string;
    bodyMessage?: string;
    color?: number;
    authorName?: string;
    authorIconURL?: string;
    thumbnailURL?: string;
    imageURL?: string;
    fields?: { name: string; value: string; inline?: boolean }[];
    ephemeral?: boolean;
    showTimestamp?: boolean;
}

export function BodyMessage(Prop: Prop) {
    const embed = new EmbedBuilder().setColor(Prop.color ?? 0xdf6771);

    if (Prop.title) {
        embed.setTitle(Prop.title);
    }

    if (Prop.bodyMessage) {
        embed.setDescription(Prop.bodyMessage);
    }

    if (Prop.footerText) {
        embed.setFooter({
            text: Prop.footerText,
            iconURL: Prop.footerIconURL,
        });
    }

    if (Prop.authorName) {
        embed.setAuthor({
            name: Prop.authorName,
            iconURL: Prop.authorIconURL,
        });
    }

    if (Prop.thumbnailURL) {
        embed.setThumbnail(Prop.thumbnailURL);
    }

    if (Prop.imageURL) {
        embed.setImage(Prop.imageURL);
    }

    if (Prop.fields) {
        Prop.fields.forEach((field) => {
            embed.addFields({
                name: field.name,
                value: field.value,
                inline: field.inline,
            });
        });
    }

    if (Prop.showTimestamp) {
        embed.setTimestamp();
    }

    return {
        embeds: [embed],
        ephemeral: Prop.ephemeral ?? false,
    };
}
