import { Client, GatewayIntentBits, ActivityType, Partials } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Channel, Partials.Message],
    presence: {
        status: 'online',
        afk: false,
        activities: [
            {
                name: 'you.',
                type: ActivityType.Listening,
            },
        ],
    },
});

export default client;
