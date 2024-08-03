import { Message } from 'discord.js';
import client from '../../../libs/bot';
//@ts-ignore
import { joinVoiceChannel } from '@discordjs/voice';
import { BodyMessage } from '../../../components/BodyMessage';

export default {
    name: 'come',
    async execute(message: Message) {
        // Find a voice channel the user is in
        const voiceChannel = client.guilds.cache
            .flatMap((guild) =>
                guild.channels.cache.filter(
                    (channel) =>
                        channel.type === 2 &&
                        channel.members.has(message.author.id)
                )
            )
            .first();

        if (voiceChannel) {
            try {
                // Join the voice channel
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
                await message.react('👌');
                await message.reply(
                    BodyMessage({
                        bodyMessage: 'vc join လာပါပြီ။',
                    })
                );
            } catch (error) {
                message.reply(
                    BodyMessage({
                        bodyMessage: 'vc ​လေးအရင် join ​ပေးပါ​နော်။',
                    })
                );
            }
        } else {
            message.reply(
                BodyMessage({
                    bodyMessage: 'vc ​လေးအရင် join ​ပေးပါ​နော်။',
                })
            );
        }
    },
};
