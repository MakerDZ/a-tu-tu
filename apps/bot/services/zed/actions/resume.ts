import { useMainPlayer } from 'discord-player';
import { Message } from 'discord.js';

export default {
    name: 'resume',
    async execute(message: Message) {
        const player = useMainPlayer();
        const queue = player.nodes.get(message.guild?.id!);

        if (!queue || !queue.isPlaying())
            return message.reply({
                content: `❌ | There is no music currently playing!.`,
                allowedMentions: { repliedUser: false },
            });

        const success = queue.node.resume();

        return success
            ? message.react('▶️')
            : message.reply({
                  content: `❌ | Something went wrong.`,
                  allowedMentions: { repliedUser: false },
              });
    },
};
