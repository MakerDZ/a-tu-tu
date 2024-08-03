import { Message } from 'discord.js';
import client from '../../../libs/bot';
import { QueryType, useMainPlayer } from 'discord-player';
import { botConfig } from '../../../config/bot';
import { extractSongName } from '../../../utils/player/extracSong';

export default {
    name: 'play',
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
        await message.react('👌');

        const song = extractSongName(message);
        if (!song) return;

        const results = await player.search(song, {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO,
        });

        try {
            const { track } = await player.play(voiceChannel?.id!, results, {
                nodeOptions: {
                    metadata: {
                        message,
                        channel: message.channel,
                        client: message.guild?.members.me,
                        requestedBy: message.author,
                    },
                    selfDeaf: true,
                    volume: botConfig.opt.volume,
                    pauseOnEmpty: false,
                    leaveOnEmpty: false,
                    leaveOnEmptyCooldown: botConfig.opt.leaveOnEmptyCooldown,
                    leaveOnEnd: false,
                    leaveOnEndCooldown: botConfig.opt.leaveOnEndCooldown,
                },
            });
        } catch (error) {
            console.log(`Play error: ${error}`);
        }
    },
};
