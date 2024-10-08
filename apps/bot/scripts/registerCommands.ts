import { InstallGlobalCommands } from '../utils/commandRegister';

// For guild install only
const _COMMANDD = {
    name: '',
    type: 1,
    description: '',
    integration_types: [0],
    contexts: [0],
};

// USER_INSTALL (GUILD, BOT_DM, PRIVATE_CHANNEL)
const HEALTH_COMMAND = {
    name: 'health',
    type: 1,
    description: 'bot အသက်ရှိပါ​သေးသလား။',
    integration_types: [1],
    contexts: [0, 1, 2],
};

const ABOUT_COMMAND = {
    name: 'about',
    type: 1,
    description: 'ဒီ bot က​နေဘာ​တွေလုပ်လို့ရမှာလဲ။',
    integration_types: [1],
    contexts: [0, 1, 2],
};

const BURMESE_TEXT_COMMAND = {
    name: 'burmese_text',
    type: 1,
    description: 'မြန်မာ font ကိုမှန်​အောင်ပို့​ပေးနိုင်ပါတယ်။',
    integration_types: [0, 1],
    contexts: [0, 2],
    options: [
        {
            name: 'message',
            description: 'မိမိပို့လို​သောမြန်မာစာ',
            type: 3,
            required: true,
        },
    ],
};

const ADD_MY_SERVER = {
    name: 'add_my_server',
    type: 1,
    description:
        'မိမိ server ကိုတစ်ခြားမြန်မာတွေအလွယ်တကူရှာနိုင်​အောင်လုပ်မယ်။',
    integration_types: [0],
    contexts: [0],
};

// USER_INSTALL (BOT_DM)
const _COMMAND = {
    name: '',
    type: 1,
    description: '',
    integration_types: [1],
    contexts: [1],
};

const ALL_COMMANDS = [
    HEALTH_COMMAND,
    ABOUT_COMMAND,
    BURMESE_TEXT_COMMAND,
    ADD_MY_SERVER,
];

InstallGlobalCommands(process.env.CLIENT_ID!, ALL_COMMANDS);
