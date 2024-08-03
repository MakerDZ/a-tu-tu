import { useMainPlayer } from 'discord-player';
import { BodyMessage } from '../../components/BodyMessage';
import { queueMap } from '../../store/queueMap';

let latencyMessage: any = null;
export let playerState = {
    pause: false,
};

export const playerEvents = () => {
    const player = useMainPlayer();
    player.events.on('playerStart', (queue, track) => {
        // Emitted when the player starts to play a song
        const trackInQueue = queueMap.get(track.id);
        queueMap.updatePlayed(track.id, true);

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
                footerText: `${trackInQueue?.index}`,
                showTimestamp: true,
            })
        );
    });

    player.events.on('audioTrackAdd', (queue, track) => {
        // Emitted when the player adds a single song to its queue
        const lastIndex = queueMap.getLastIndex();
        const index = lastIndex === undefined ? 0 : lastIndex + 1;
        queueMap.set(track.id, {
            index,
            track,
            played: false,
        });

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
                footerText: `${index}`,
                showTimestamp: true,
            })
        );
    });

    player.events.on('audioTracksAdd', (queue, tracks) => {
        // Emitted when the player adds multiple songs to its queue
        tracks.map((track) => {
            const lastIndex = queueMap.getLastIndex();
            const index = lastIndex === undefined ? 0 : lastIndex + 1;
            queueMap.set(track.id, {
                index,
                track,
                played: false,
            });
        });
    });

    player.events.on('playerSkip', (queue, track) => {
        // Emitted when the audio player fails to load the stream for a song
    });

    player.events.on('playerPause', (queue) => {
        playerState.pause = true;
    });

    player.events.on('playerResume', (queue) => {
        playerState.pause = false;
    });

    player.events.on('disconnect', (queue) => {
        // Emitted when the bot leaves the voice channel
        BodyMessage({
            bodyMessage: 'vc က​နေ disconnect ခံလိုက်ရပါပြီ။',
        });
    });
    player.events.on('emptyChannel', (queue) => {
        // Emitted when the voice channel has been empty for the set threshold
        // Bot will automatically leave the voice channel with this event
        queue.metadata.message.channel.send(
            BodyMessage({
                bodyMessage: 'ဘယ်သူမှမရှိ​တော့တဲ့အတွက်ခဏ​နေရင်ထွက်ပါ​တော့မယ်။',
            })
        );
    });
    player.events.on('emptyQueue', (queue) => {
        // Emitted when the player queue has finished
        queueMap.clear();
        queue.metadata.message.channel.send(
            BodyMessage({
                title: '<:music_player_icon:1154391505918775317> Queue is Empty',
                bodyMessage: 'သီချင်း​တွေအားလုံးဖွင့်လို့ပြီးသွားပါပြီ။',
            })
        );
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
