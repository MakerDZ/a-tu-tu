import { Message } from 'discord.js';
import client from '../../../libs/bot';
import { useMainPlayer } from 'discord-player';
import { BodyMessage } from '../../../components/BodyMessage';
import { extractValue } from '../../../utils/player/extractValue';

export default {
    name: 'loop',
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

        const command = extractValue(message, 'loop')?.toLowerCase();
        let mode: null | number = null;

        if (!command) {
            return message.reply(
                BodyMessage({
                    title: '<:music_player_icon:1154391505918775317> Please select loop option',
                    bodyMessage: 'loop <ap/all/one/off>',
                })
            );
        }

        switch (command) {
            case 'off':
                mode = 0;
                break;
            case 'one':
            case 'single':
                mode = 1;
                break;
            case 'all':
            case 'queue':
                mode = 2;
                break;
            case 'ap':
            case 'autoplay':
                mode = 3;
                break;
            default:
                return message.reply(
                    BodyMessage({
                        title: '❌ Error',
                        bodyMessage: 'loop <ap/all/one/off>',
                    })
                );
        }

        queue.setRepeatMode(mode);
        message.react('👌');
    },
};
