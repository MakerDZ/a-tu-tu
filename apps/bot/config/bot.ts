export const botConfig = {
    zedId: '696735113907667005',
    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: [],
        },
        Translate_Timeout: 10000,
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: false,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: false,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25,
            },
        },
    },
};
