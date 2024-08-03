import { useMainPlayer } from 'discord-player';
import { Message } from 'discord.js';
import { playerState } from '../../../events/player/events';

export default {
    name: 'pause',
    async execute(message: Message) {
        const player = useMainPlayer();
        const queue = player.nodes.get(message.guild?.id!);

        if (!queue || !queue.isPlaying())
            return message.reply({
                content: `❌ | There is no music currently playing!.`,
                allowedMentions: { repliedUser: false },
            });
        if (playerState.pause) {
            const success = queue.node.resume();
            return success
                ? message.react('⏸️')
                : message.reply({
                      content: `❌ | Something went wrong.`,
                      allowedMentions: { repliedUser: false },
                  });
        } else {
            const success = queue.node.pause();
            return success
                ? message.react('⏸️')
                : message.reply({
                      content: `❌ | Something went wrong.`,
                      allowedMentions: { repliedUser: false },
                  });
        }
    },
};
