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
