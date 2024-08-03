import { Message } from 'discord.js';
import client from '../../../libs/bot';
//@ts-ignore
import { getVoiceConnection } from '@discordjs/voice';
import { BodyMessage } from '../../../components/BodyMessage';

export default {
    name: 'leave',
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

        if (voiceChannel) {
            const connection = getVoiceConnection(voiceChannel.guild.id);

            if (connection) {
                connection.destroy();
                await message.react('👌');
                await message.reply(
                    BodyMessage({
                        bodyMessage: 'တာ့တာပါ။ vc ထွက်လိုက်ပါပြီ။',
                    })
                );
            } else {
                message.reply(
                    BodyMessage({
                        bodyMessage: 'vc ​လေးအရင် join ​ပေးပါ​နော်။',
                    })
                );
            }
        } else {
            message.reply(
                BodyMessage({
                    bodyMessage:
                        'ဘယ် vc က​နေထွက်ရမလဲဆိုတာ သိရ​အောင် vc ​လေးအရင် join ​ပေးပါ​နော်။',
                })
            );
        }
    },
};
