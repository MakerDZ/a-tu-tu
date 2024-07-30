import { SlashCommandBuilder } from 'discord.js';

const ping_pong = new SlashCommandBuilder()
    .setName('health')
    .setDescription('Are you still alive?');

export default ping_pong;
