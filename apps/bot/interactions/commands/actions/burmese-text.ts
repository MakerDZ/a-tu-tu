import { AttachmentBuilder, CommandInteraction } from 'discord.js';
import TextToImage from '../../../utils/BurmeseTextToImage';
import { EmbedBuilder } from 'discord.js';

export default {
    name: 'burmese_text',
    async execute(interaction: CommandInteraction) {
        const message = interaction.options.data
            .filter((data) => data.name == 'message')[0]
            .value?.toString();

        const imageData = await TextToImage(message ? message : '');
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        const attachment = new AttachmentBuilder(buffer, { name: 'image.png' });

        const embedReply = new EmbedBuilder().setColor(0xdf6771).setFooter({
            text: interaction.user.displayName,
            iconURL: interaction.user.avatarURL()!,
        });

        await interaction.reply({ files: [attachment], embeds: [embedReply] });
    },
};
