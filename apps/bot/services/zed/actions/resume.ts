import { useMainPlayer } from 'discord-player';
import { Message } from 'discord.js';
import client from '../../../libs/bot';
import { BodyMessage } from '../../../components/BodyMessage';

export default {
    name: 'resume',
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

        const success = queue.node.resume();

        return success
            ? message.react('▶️')
            : message.reply({
                  content: `❌ | Something went wrong.`,
                  allowedMentions: { repliedUser: false },
              });
    },
};
