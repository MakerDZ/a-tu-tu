import { useMainPlayer } from 'discord-player';
import { EmbedBuilder, Message } from 'discord.js';
import { queueMap } from '../../../store/queueMap';

export default {
    name: 'queue',
    async execute(message: Message) {
        const player = useMainPlayer();

        const queue = player.nodes.get(message.guild?.id!);

        if (!queue || !queue.currentTrack)
            return message.reply({
                content: `❌ | There is no music currently playing.`,
                allowedMentions: { repliedUser: false },
            });

        const tracks = queue.tracks.map(
            (track, index) => `${queueMap.get(track.id)?.index}. ${track.title}`
        );

        let nowplaying = `**\`${queue.currentTrack.duration}\` [${queue.currentTrack.title}](${queue.currentTrack.url})**`;
        let tracksQueue = '';

        if (tracks.length < 1) {
            tracksQueue = '------------------------------';
        } else if (tracks.length > 9) {
            tracksQueue = tracks.slice(0, 10).join('\n');
            tracksQueue += `\nand ${tracks.length - 10} other songs`;
        } else {
            tracksQueue = tracks.join('\n');
        }

        let loopStatus = queue.repeatMode
            ? queue.repeatMode === 2
                ? 'All'
                : 'One'
            : 'Off';
        return message.reply({
            embeds: [
                queueEmbed(
                    '<:music_player_icon:1154391505918775317> Queue List',
                    nowplaying,
                    tracksQueue,
                    loopStatus
                ),
            ],
            allowedMentions: { repliedUser: false },
        });
    },
};

const queueEmbed = function (
    status: any,
    nowplay: any,
    queueMsg: any,
    loopStatus: any
) {
    const Embed_queue = new EmbedBuilder()
        .setColor(0xdf6771)
        .setTitle(status)
        .addFields(
            {
                name: '<a:playingnow:1269214757571792958> Now Playing',
                value: nowplay,
            },
            { name: 'ㅤ', value: queueMsg }
        )
        .setTimestamp()
        .setFooter({ text: `Loop: ${loopStatus}` });
    return Embed_queue;
};
