import { useMainPlayer } from 'discord-player';
import { EmbedBuilder, Message } from 'discord.js';
import { queueMap } from '../../../store/queueMap';
import client from '../../../libs/bot';
import { BodyMessage } from '../../../components/BodyMessage';

export default {
    name: 'queue',
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

        if (!queue || !queue.currentTrack)
            return message.reply(
                BodyMessage({
                    title: '<:music_player_icon:1154391505918775317> No song is playing',
                    bodyMessage: 'လက်ရှိဖွင့်ထား​သော သီချင်းမရှိ​သေးပါ။',
                })
            );

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
