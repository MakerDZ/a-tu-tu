import { Player } from 'discord-player';
import { Client, GatewayIntentBits, ActivityType, Partials } from 'discord.js';
import { botConfig } from '../config/bot';
import { YoutubeiExtractor } from 'discord-player-youtubei';

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
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

const player = new Player(client, botConfig.opt.discordPlayer);
player.extractors.register(YoutubeiExtractor, {});

export default client;
