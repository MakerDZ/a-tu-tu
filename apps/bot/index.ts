import 'dotenv/config';
import client from './libs/bot';
import loadEvents from './libs/eventLoader';

client
    .login(process.env.BOT_TOKEN)
    .then(() => {
        loadEvents();
    })
    .catch((err) => {
        console.log(err);
    });

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
      