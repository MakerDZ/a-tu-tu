import { Message } from 'discord.js';
import { useMainPlayer } from 'discord-player';
import { delay } from '../../../utils/delay';
import { queueMap } from '../../../store/queueMap';
import { extractSkip } from '../../../utils/player/extractSkip';
import client from '../../../libs/bot';
import { BodyMessage } from '../../../components/BodyMessage';

export default {
    name: 'skip',
    async execute(message: Message) {
        const voiceChannel = client.guilds.cache
            .flatMap((guild) =>
                guild.channels.cache.filter(
                    (channel) =>
                        channel.type === 2 &&
                        channel.members.has(message.author.id)
                )
            )
            .first();

        const player = useMainPlayer();
        const queue = player.nodes.get(voiceChannel?.guildId!);

        if (!queue || !queue.isPlaying())
            return message.reply(
                BodyMessage({
                    title: '<:music_player_icon:1154391505918775317> No song is playing',
                    bodyMessage: 'လက်ရှိဖွင့်ထား​သော သီချင်းမရှိ​သေးပါ။',
                })
            );

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
        } else if (track && track.played) {
            return message.reply('That song has already been played.');
        }
    },
};
