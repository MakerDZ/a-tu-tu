import { useMainPlayer } from 'discord-player';
import { BodyMessage } from '../../components/BodyMessage';

let latencyMessage: any = null;
export let playerState = {
    pause: false,
};

export const playerEvents = () => {
    const player = useMainPlayer();
    player.events.on('playerStart', (queue, track) => {
        // Emitted when the player starts to play a song
        queue.metadata.message.channel.send(
            BodyMessage({
                authorIconURL: queue.metadata.message.author.avatarURL()!,
                authorName: queue.metadata.message.author.displayName,
                thumbnailURL: track.thumbnail,
                fields: [
                    {
                        name: '<a:playingnow:1269214757571792958> Now Playing',
                        value: `**\`${track.duration}\` [${track.title}](${track.url})**`,
                    },
                ],
                showTimestamp: true,
            })
        );
    });

    player.events.on('audioTrackAdd', (queue, track) => {
        // Emitted when the player adds a single song to its queue
        queue.metadata.message.channel.send(
            BodyMessage({
                authorIconURL: queue.metadata.message.author.avatarURL()!,
                authorName: queue.metadata.message.author.displayName,
                thumbnailURL: track.thumbnail,
                fields: [
                    {
                        name: '<:successemote:1269215521098694718> Added to queue',
                        value: `**\`${track.duration}\` [${track.title}](${track.url})**`,
                    },
                ],
                showTimestamp: true,
            })
        );
    });

    player.events.on('audioTracksAdd', (queue, track) => {
        // Emitted when the player adds multiple songs to its queue
        queue.metadata.message.channel.send(`Multiple Track's queued`);
    });

    player.events.on('playerSkip', (queue, track) => {
        // Emitted when the audio player fails to load the stream for a song
        queue.metadata.message.channel.send(
            `Skipping **${track.title}** due to an issue!`
        );
    });

    player.events.on('playerPause', (queue) => {
        playerState.pause = true;
    });

    player.events.on('playerResume', (queue) => {
        playerState.pause = false;
    });

    player.events.on('disconnect', (queue) => {
        // Emitted when the bot leaves the voice channel
        queue.metadata.message.channel.send(
            'Looks like my job here is done, leaving now!'
        );
    });
    player.events.on('emptyChannel', (queue) => {
        // Emitted when the voice channel has been empty for the set threshold
        // Bot will automatically leave the voice channel with this event
        queue.metadata.message.channel.send(
            `Leaving because no vc activity for the past 5 minutes`
        );
    });
    player.events.on('emptyQueue', (queue) => {
        // Emitted when the player queue has finished
        queue.metadata.message.channel.send('Queue finished!');
    });

    player.on('debug', async (msg) => {
        // Emitted when the player sends debug info
        // Useful for seeing what dependencies, extractors, etc are loaded
        console.log(`General player debug event: ${msg}`);
    });

    player.events.on('debug', async (queue, msg) => {
        // Emitted when the player queue sends debug info
        // Useful for seeing what state the current queue is at
        console.log(`Player debug event: ${msg}`);
        if (msg.includes('Event loop latency') && !latencyMessage) {
            const latency = msg.split(':')[1].replace(' ', '');
            latencyMessage = await queue.metadata.message.channel.send(
                BodyMessage({
                    fields: [
                        {
                            name: '<a:sexy_loading:1156949897778577449> Latency Issue',
                            value: `**\`${latency}\` **`,
                        },
                    ],
                    showTimestamp: true,
                })
            );
        } else if (latencyMessage) {
            const latency = msg.split(':')[1].replace(' ', '');
            latencyMessage.edit(
                BodyMessage({
                    fields: [
                        {
                            name: '<a:sexy_loading:1156949897778577449> Latency Issue',
                            value: `**\`${latency}\` **`,
                        },
                    ],
                    showTimestamp: true,
                })
            );
        }
    });
};
