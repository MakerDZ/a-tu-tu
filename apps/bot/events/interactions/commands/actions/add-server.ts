import { CommandInteraction, GuildMember } from 'discord.js';
import { ErrorMesssage } from '../../../../components/ErrorMessage';

export default {
    name: 'add_my_server',
    async execute(interaction: CommandInteraction) {
        if (!interaction.guild) {
            await interaction.reply(
                ErrorMesssage({
                    title: 'Action Failed.',
                    message: 'This command can only be used in a server.',
                    ephemeral: true,
                })
            );
            return;
        }

        const member = interaction.guild.members.cache.get(
            interaction.user.id
        ) as GuildMember;
        const hasAdminPermissions = member?.permissions.has('Administrator');

        if (!member || !hasAdminPermissions) {
            await interaction.reply(
                ErrorMesssage({
                    title: 'လုပ်ဆောင်မှု့မအောင်မြင်ပါ။',
                    message:
                        'ယခု server ကို listing ပြုလုပ်ရန်အတွက်သင့်မှာ administrator permission ရှိနေရန်လိုအပ်ပါသည်။',
                })
            );
            return;
        }
        console.log(interaction.guild.bannerURL(), interaction.guild.iconURL());

        // checking the server was already listed or not
    },
};
