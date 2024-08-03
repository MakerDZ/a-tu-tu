import { Message } from 'discord.js';
import { useMainPlayer } from 'discord-player';
import { delay } from '../../../utils/delay';
import { queueMap } from '../../../store/queueMap';
import { extractSkip } from '../../../utils/player/extractSkip';

export default {
    name: 'skip',
    async execute(message: Message) {
        const player = useMainPlayer();
        const queue = player.nodes.get(message.guild?.id!);

        if (!queue || !queue.isPlaying())
            return message.reply({
                content: `❌ | There is no music currently playing!.`,
                allowedMentions: { repliedUser: false },
            });

        const command = extractSkip(message);
        const skipTo = command == null ? null : Number(command);
        const track = skipTo ? queueMap.findByIndex(skipTo) : null;

        await message.react('👌');
        if (!command) {
            if (queue.repeatMode === 1) {
                queue.setRepeatMode(0);
                queue.node.skip();
                await delay(500);
                queue.setRepeatMode(1);
            } else {
                queue.node.skip();
            }
            return;
        }

        if (track && !track.played) {
            queueMap.updatePlayed(track.track.id, true);
            if (queue.repeatMode === 1) {
                queue.setRepeatMode(0);
                queue.node.skipTo(track.track);
                await delay(500);
                queue.setRepeatMode(1);
            } else {
                queue.node.skipTo(track.track);
            }
        } else {
            return message.reply('That song has already been played.');
        }
    },
};
